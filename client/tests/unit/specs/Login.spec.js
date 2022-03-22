import { createLocalVue, mount } from "@vue/test-utils";
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";
import Login from "@/components/authentication/Login.vue";
import tokenSetter from "@/utils/authTokenSetter";

const localSetItem = jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
const mockStore = { dispatch: jest.fn() };
const localVue = createLocalVue();
const url = "http://localhost:3000/api/authentication/login";
let vuetify = new Vuetify();
let wrapper;
const error = {
  response: {
    data: {
      password: "Password error",
      user: "Email error",
    },
  },
};
const response = {
  data: {
    auth: true,
    data: {
      data: "testData",
    },
    success: true,
    token: "testToken",
  },
};

jest.mock("axios");
vuetify = new Vuetify();

beforeEach(() => {
  wrapper = mount(Login, {
    localVue,
    mocks: {
      $store: mockStore,
    },
    stubs: ["router-link", "router-view"],
    vuetify,
    data() {
      return {
        email: "",
        isFormValid: false,
        password: "",
        redirectError: this.message,
      };
    },
    propsData: {
      message: "",
    },
  });
});

afterEach(() => {
  axios.post.mockReset();
  wrapper.destroy();
});

describe("Implementation test for Login.vue - successful HTTP post", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);
  });

  it("Render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Initializes with correct elements", () => {
    // Check buttons initial state
    expect(wrapper.findAll(".v-btn").length).toEqual(4);
    expect(wrapper.find("button[name=accept]").text()).toMatch("ok");
    expect(wrapper.find("[name=back]").text()).toMatch("back");
    expect(wrapper.find("button[name=login]").text()).toMatch("sign in");
    expect(wrapper.find("[name=register]").text()).toMatch("sign up");
    expect(wrapper.find("button[name=login]").element.disabled).toBeTruthy();

    // Check auth alert initial state
    expect(wrapper.find(".v-alert").attributes().class).toContain("whitespace");

    // Check inputs initial state
    expect(wrapper.findAll(".v-text-field").length).toEqual(2);
    expect(wrapper.find("input[name=email]").text()).toEqual("");
    expect(wrapper.find("input[name=password]").text()).toEqual("");

    // Check validation initial state
    expect(wrapper.findAll(".v-messages").length).toEqual(2);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it("Enables log-in button when email address and password are set", async () => {
    await wrapper.setData({
      email: "email value",
      password: "password value",
    });

    await Vue.nextTick();

    // Check that the user data was properly set
    expect(wrapper.find("input[name=email]").element.value).toEqual("email value");
    expect(wrapper.find("input[name=password]").element.value).toEqual("password value");
    expect(wrapper.vm.email).toBe("email value");
    expect(wrapper.vm.password).toBe("password value");

    // Check if validation pass
    expect(wrapper.vm.isFormValid).toBeTruthy();

    // Check that the login button is active
    expect(wrapper.find("button[name=login]").element.disabled).toBeFalsy();
  });

  it("Fail validation when one field is empty", async () => {
    await wrapper.setData({
      email: "email value",
    });

    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it("Enables dismissible auth alert when authentication failed", async () => {
    await wrapper.setData({
      redirectError: "Access denied",
    });

    // Check that auth alert is visible
    expect(wrapper.find(".v-alert").attributes().class).toContain("errorAlert");

    await wrapper.vm.hideRedirectError();

    // Check that auth alert is hidden
    expect(wrapper.find(".v-alert").attributes().class).toContain("whitespace");
  });

  it("Should send a post request with correct on form submit", async () => {
    await wrapper.setData({
      email: "email value",
      password: "password value",
    });

    await wrapper.vm.login();

    // Check if a post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if a post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if a post was called with correct data
    expect(axios.post).toHaveBeenCalledWith(url, {
      email: "email value",
      password: "password value",
    });
  });

  it("Should store user data and auth status after successful login", async () => {
    wrapper.vm.login();

    // Check if any action were dispatched
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if two actions were dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(2);

    // Check auth state was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, "remitAuthState", true);

    // Check user data was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, "saveUser", response.data.data);
  });

  it("Should store a token on successful login", async () => {
    wrapper.vm.login();

    await tokenSetter("token", true);

    expect(localSetItem).toHaveBeenCalled();
    expect(localSetItem).toHaveBeenNthCalledWith(1, "authenticationToken", "testToken");
  });
});

describe("Implementation test for Login.vue - failed HTTP post", () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Display error messages on HTTP post failure", async () => {
    await wrapper.vm.login();

    await Vue.nextTick();

    expect(wrapper.findAll(".v-messages").length).toEqual(2);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Email error");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("Password error");
  });

  it("Does not dispatch data on a failed HTTP post", () => {
    wrapper.vm.login();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it("Does not set token when a failed HTTP post occurs", () => {
    wrapper.vm.login();

    expect(localSetItem).not.toHaveBeenCalled();
  });
});

describe("Behavioral test for Login.vue - successful HTTP post", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);
  });

  it("Dismiss auth error on click", async () => {
    await wrapper.setData({
      redirectError: "Access denied",
    });

    // Check that auth alert is visible
    expect(wrapper.find(".v-alert").attributes().class).toContain("errorAlert");

    await wrapper.find("button[name=accept]").trigger("click");

    // Check that auth alert is hidden after a click
    expect(wrapper.find(".v-alert").attributes().class).toContain("whitespace");
  });

  it("Should not send a post request when inputs are empty", async () => {
    wrapper.find("button[name=login]").trigger("click");

    expect(axios.post).not.toHaveBeenCalled();
  });

  it("Should send a post request with correct data on form submit", async () => {
    await wrapper.find("input[name=email]").setValue("email value");
    await wrapper.find("input[name=password]").setValue("password value");

    await Vue.nextTick();

    wrapper.find("button[name=login]").trigger("click");

    // Check if sing in button was clicked
    expect(axios.post).toHaveBeenCalled();

    // Check if a post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if a post was called with correct data
    expect(axios.post).toHaveBeenCalledWith(url, {
      email: "email value",
      password: "password value",
    });
  });

  it("Should store user data and auth status after successful login", () => {
    wrapper.find("button[name=login]").trigger("click");

    // Check if any action were dispatched
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if two actions were dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(2);

    // Check auth state was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, "remitAuthState", true);

    // Check user data was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, "saveUser", response.data.data);
  });

  it("Should store a token on successful login", async () => {
    wrapper.find("button[name=login]").trigger("click");

    await tokenSetter("token", true);

    expect(localSetItem).toHaveBeenCalled();
    expect(localSetItem).toHaveBeenNthCalledWith(1, "authenticationToken", "testToken");
  });
});

describe("Behavioral test for Login.vue - failed HTTP post", () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Display error messages on HTTP post failure", async () => {
    await wrapper.find("input[name=email]").setValue("email value");
    await wrapper.find("input[name=password]").setValue("password value");

    await Vue.nextTick();

    await wrapper.find("button[name=login]").trigger("click");

    await Vue.nextTick();

    expect(wrapper.findAll(".v-messages").length).toEqual(2);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Email error");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("Password error");
  });

  it("Hide HTTP post error messages when a user enters new data", async () => {
    await wrapper.setData({
      passwordError: "Password error",
      userError: "Email error",
    });

    await wrapper.findAll("input").trigger("keyup");

    expect(wrapper.findAll(".v-messages").length).toEqual(2);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");
  });

  it("Does not dispatch data when a failed HTTP post occurs", () => {
    wrapper.find("button[name=login]").trigger("click");

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it("Does not set token when a failed HTTP post occurs", () => {
    wrapper.find("button[name=login]").trigger("click");

    expect(localSetItem).not.toHaveBeenCalled();
  });
});
