import { createLocalVue, mount } from "@vue/test-utils";
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";
import Register from "@/components/authentication/Register.vue";
import tokenSetter from "@/utils/authTokenSetter";

const localSetItem = jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
const localVue = createLocalVue();
const mockStore = { dispatch: jest.fn() };
const url = "http://localhost:3000/api/authentication/register";
const vuetify = new Vuetify();
let wrapper;
const error = {
  response: {
    data: {
      errors: {
        email: {
          msg: "Email error",
        },
        username: {
          msg: "Username error",
        },
      },
    },
  },
};
const response = {
  data: {
    auth: true,
    user: {
      data: "testData",
    },
    success: true,
    token: "testToken",
  },
};

jest.mock("axios");

beforeEach(() => {
  wrapper = mount(Register, {
    localVue,
    mocks: {
      $store: mockStore,
    },
    stubs: ["router-link", "router-view"],
    vuetify,
    data() {
      return {
        email: "",
        emailError: "",
        isFormValid: false,
        password: "",
        usernameError: "",
        username: "",
      };
    },
  });
});

afterEach(() => {
  axios.post.mockReset();
  wrapper.destroy();
});

describe("Implementation test for Register.vue - successful HTTP post", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);
  });

  it("Render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Initializes with correct elements", () => {
    // Check buttons initial state
    expect(wrapper.findAll(".v-btn").length).toEqual(3);
    expect(wrapper.find("[name=back]").text()).toMatch("back");
    expect(wrapper.find("button[name=register]").text()).toMatch("sign up");
    expect(wrapper.find("[name=login]").text()).toMatch("sign in");
    expect(wrapper.find("button[name=register]").element.disabled).toBeTruthy();

    // Check inputs initial state
    expect(wrapper.findAll(".v-text-field").length).toEqual(3);
    expect(wrapper.find("input[name=username]").text()).toEqual("");
    expect(wrapper.find("input[name=email]").text()).toEqual("");
    expect(wrapper.find("input[name=password]").text()).toEqual("");

    // Check validation initial state
    expect(wrapper.findAll(".v-messages").length).toEqual(3);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");
    expect(wrapper.findAll(".v-messages").at(2).text()).toEqual("Minimum length - 6 characters");
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it("Enables error messages", async () => {
    await wrapper.setData({
      emailError: "Email error",
      usernameError: "Username error",
    });

    expect(wrapper.findAll(".v-messages").length).toEqual(3);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Username error");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("Email error");
  });

  it("Enables sign up button when user data were set", async () => {
    await wrapper.setData({
      email: "test@email.js",
      password: "password",
      username: "username",
    });

    // Check that the user data is properly set
    expect(wrapper.find("input[name=username]").element.value).toEqual("username");
    expect(wrapper.find("input[name=email]").element.value).toEqual("test@email.js");
    expect(wrapper.find("input[name=password]").element.value).toEqual("password");
    expect(wrapper.vm.username).toBe("username");
    expect(wrapper.vm.email).toBe("test@email.js");
    expect(wrapper.vm.password).toBe("password");

    await Vue.nextTick();
    // Check if validation pass
    expect(wrapper.vm.isFormValid).toBeTruthy();

    // Check that the sign-up button is active
    expect(wrapper.find("button[name=register]").element.disabled).toBeFalsy();
  });

  it("Fail validation when only one field was entered", async () => {
    await wrapper.setData({
      username: "username",
    });

    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it("Fail validation when character range is invalid", async () => {
    await wrapper.setData({
      email: "123@123.pl",
      username: "1",
      password: "123456",
    });

    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it("Fail validation when email address pattern is invalid", async () => {
    await wrapper.setData({
      email: "wrongPatter",
    });

    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it("Should send a post request with correct data on form submit", async () => {
    await wrapper.setData({
      email: "test@email.js",
      password: "password",
      username: "username",
    });

    await Vue.nextTick();

    wrapper.vm.createUser();

    // Check if a post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if a post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if a post was called with correct data
    expect(axios.post).toHaveBeenCalledWith(url, {
      email: "test@email.js",
      password: "password",
      username: "username",
    });
  });

  it("Should store user data and auth status after successful register", async () => {
    wrapper.vm.createUser();

    // Check if any action were dispatched
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if two actions were dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(2);

    // Check auth state was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, "remitAuthState", true);

    // Check user data was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, "saveUser", response.data.user);
  });

  it("Should store a token on the successful register", async () => {
    wrapper.vm.createUser();

    await tokenSetter("token", true);

    expect(localSetItem).toHaveBeenCalled();
    expect(localSetItem).toHaveBeenNthCalledWith(1, "authenticationToken", "testToken");
  });
});

describe("Implementation test for Register.vue - failed HTTP post", () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Display error messages on HTTP post failure", async () => {
    await wrapper.vm.createUser();

    await Vue.nextTick();

    expect(wrapper.findAll(".v-messages").length).toEqual(3);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Username error");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("Email error");
    expect(wrapper.findAll(".v-messages").at(2).text()).toEqual("Minimum length - 6 characters");
  });

  it("Does not dispatch data on a failed HTTP post", () => {
    wrapper.vm.createUser();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it("Does not set a token when a failed HTTP post occurs", () => {
    wrapper.vm.createUser();

    expect(localSetItem).not.toHaveBeenCalled();
  });
});

describe("Behavioral test for Register.vue - successful HTTP post", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);
  });

  it("Should not send post request when inputs are empty", async () => {
    wrapper.find("button[name=register]").trigger("click");

    expect(axios.post).not.toHaveBeenCalled();
  });

  it("Should send a post request with correct on form submit", async () => {
    await wrapper.find("input[name=username]").setValue("username");
    await wrapper.find("input[name=email]").setValue("test@email.js");
    await wrapper.find("input[name=password]").setValue("password");

    await Vue.nextTick();

    wrapper.find("button[name=register]").trigger("click");

    // Check if sing in button was clicked
    expect(axios.post).toHaveBeenCalled();

    // Check if a post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if a post was called with correct data
    expect(axios.post).toHaveBeenCalledWith(url, {
      email: "test@email.js",
      password: "password",
      username: "username",
    });
  });

  it("Should store user data and auth status after successful register", () => {
    wrapper.find("button[name=register]").trigger("click");

    // Check if any action was dispatched
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if two actions were dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(2);

    // Check auth state was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, "remitAuthState", true);

    // Check user data was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, "saveUser", response.data.user);
  });

  it("Should store a token on the successful register", async () => {
    wrapper.find("button[name=register]").trigger("click");

    await tokenSetter("token", true);

    expect(localSetItem).toHaveBeenCalled();
    expect(localSetItem).toHaveBeenNthCalledWith(1, "authenticationToken", "testToken");
  });
});

describe("Behavioral test for Register.vue - failed HTTP post", () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);
  });

  afterEach(() => {
    localSetItem.mockClear();
    mockStore.dispatch.mockReset();
  });

  it("Display error messages on HTTP post failure", async () => {
    await wrapper.find("input[name=username]").setValue("username");
    await wrapper.find("input[name=email]").setValue("test@email.js");
    await wrapper.find("input[name=password]").setValue("password");

    await Vue.nextTick();

    await wrapper.find("button[name=register]").trigger("click");

    await Vue.nextTick();

    expect(wrapper.findAll(".v-messages").length).toEqual(3);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Username error");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("Email error");
  });

  it("Hide HTTP post error messages when the user enters new data", async () => {
    await wrapper.setData({
      emailError: "Password error",
      usernameError: "Email error",
    });

    await wrapper.findAll("input").trigger("keyup");

    expect(wrapper.findAll(".v-messages").length).toEqual(3);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");
  });

  it("Does not dispatch data when a failed HTTP post occurs", () => {
    wrapper.find("button[name=register]").trigger("click");

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it("Does not set token when a failed HTTP post occurs", () => {
    wrapper.find("button[name=register]").trigger("click");

    expect(localSetItem).not.toHaveBeenCalled();
  });
});
