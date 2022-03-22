import { createLocalVue, mount } from "@vue/test-utils";
import axios from "axios";
import io from "socket.io-client";
import MockedSocket from "socket.io-mock";
import Vue from "vue";
import Vuetify from "vuetify";
import AddRoomModal from "@/components/room/AddRoomModal.vue";

const localVue = createLocalVue();
let socket;
const url = "http://localhost:3000/api/room";
const vuetify = new Vuetify();
let wrapper;
const mockStore = {
  getters: {
    getUserInfo: {
      createdDate: "2021-04-20T01:01:22.269Z",
      email: "test@mail.js",
      _id: "321testid",
      username: "testUser",
    },
  },
};
const error = {
  response: {
    data: {
      errors: {
        name: {
          msg: "Name error",
        },
        password: {
          msg: "Password error",
        },
      },
    },
  },
};
const response = {
  data: {
    data: "testMessageData",
    success: true,
  },
};

jest.mock("axios");
jest.mock("socket.io-client");

afterEach(() => {
  jest.resetAllMocks();
  wrapper.destroy();
});

describe("Implementation test for AddRoomModal.vue - successful HTTP post", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    socket = new MockedSocket();
    io.mockReturnValue(socket);

    wrapper = mount(AddRoomModal, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      vuetify,
      data() {
        return {
          isFormValid: false,
          room: {
            name: "",
            password: "",
          },
        };
      },
    });
  });

  it("Render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Check that socket connection is established", () => {
    expect(io.connect).toHaveBeenCalled();
  });

  it("Should emit new room data", () => {
    socket.on("createRoom", (data) => {
      expect(data).toEqual("roomData");
    });
  });

  it("Initializes with correct elements", () => {
    // Check buttons initial state
    expect(wrapper.findAll("button").length).toEqual(2);
    expect(wrapper.find("button[name=close]").text()).toMatch("close");
    expect(wrapper.find("button[name=save]").text()).toMatch("save");
    expect(wrapper.find("button[name=save]").element.disabled).toBeTruthy();

    // Check inputs initial state
    expect(wrapper.findAll(".v-text-field").length).toEqual(2);
    expect(wrapper.find("input[name=name]").text()).toEqual("");
    expect(wrapper.find("input[name=name]").text()).toEqual("");

    // Check validation initial state
    expect(wrapper.findAll(".v-messages").length).toEqual(2);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Required");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it("Set input data correctly", async () => {
    // Check inputs initial state
    expect(wrapper.findAll(".v-text-field").length).toEqual(2);
    expect(wrapper.find("input[name=name]").text()).toEqual("");
    expect(wrapper.find("input[name=password]").text()).toEqual("");

    await wrapper.setData({
      room: {
        name: "test",
        password: "123456",
      },
    });

    await Vue.nextTick();

    // Check that the room data was properly set
    expect(wrapper.find("input[name=name]").element.value).toEqual("test");
    expect(wrapper.find("input[name=password").element.value).toEqual("123456");
  });

  it("Pass validation when the only name was entered", async () => {
    await wrapper.setData({
      room: {
        name: "room name",
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeTruthy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Required");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");
  });

  it("Fail validation when room name character range is invalid", async () => {
    await wrapper.setData({
      room: {
        name: "1",
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeFalsy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Characters range: 3 - 15");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");
  });

  it("Fail validation when the only password was entered", async () => {
    await wrapper.setData({
      room: {
        password: "123456",
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeFalsy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Required");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");
  });

  it("Fail validation when password contains whitespace", async () => {
    await wrapper.setData({
      room: {
        name: "test",
        password: "123 456",
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeFalsy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Required");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("No blank spaces allowed");
  });

  it("Fail validation when room password character range is invalid", async () => {
    await wrapper.setData({
      room: {
        name: "test",
        password: "123",
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeFalsy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Required");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual(
      "Password must be at least 6 characters long"
    );
  });

  it("Enables save room button on validation pass", async () => {
    await wrapper.setData({
      room: {
        name: "room name",
        password: "123456",
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeTruthy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Required");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");

    // Check that the save button is active
    expect(wrapper.find("button[name=save]").element.disabled).toBeFalsy();
  });

  it("Should send a post request with correct data on submit", async () => {
    await wrapper.setData({
      room: {
        name: "name",
        password: "123456",
      },
    });

    await Vue.nextTick();

    wrapper.vm.formValidation();

    // Check if a post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if a post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if a post was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(url, {
      name: "name",
      password: "123456",
      user: {
        _id: "321testid",
        createdDate: "2021-04-20T01:01:22.269Z",
        email: "test@mail.js",
        username: "testUser",
      },
    });
  });

  it("Should emit close dialog event", async () => {
    await wrapper.setData({
      room: {
        name: "room name",
        password: "123456",
      },
    });

    await wrapper.vm.createRoom();

    expect(wrapper.emitted().closeModal).toBeTruthy();
    expect(wrapper.emitted().closeModal.length).toBe(1);
  });
});

beforeEach(() => {
  wrapper = mount(AddRoomModal, {
    localVue,
    mocks: {
      $store: mockStore,
    },
    vuetify,
    data() {
      return {
        isFormValid: false,
        nameError: "",
        passwordError: "",
        room: {
          name: "",
          password: "",
        },
      };
    },
  });
});

describe("Implementation test for AddRoomModal.vue - failed HTTP post", () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);
  });

  it("Should display errors", async () => {
    await wrapper.setData({
      room: {
        name: "room name",
        password: "123456",
      },
    });

    await wrapper.vm.createRoom();

    await Vue.nextTick();

    expect(wrapper.findAll(".v-messages").length).toEqual(2);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Name error");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("Password error");
    expect(wrapper.vm.isformValid).toBeFalsy();
  });
});

describe("Behavioral test for AddRoomModal.vue - successful HTTP post", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);
  });

  it("Should not send post request when inputs are empty", async () => {
    await wrapper.find("button[name=save]").trigger("click");

    expect(axios.post).not.toHaveBeenCalled();
  });

  it("Set input data correctly", async () => {
    await wrapper.find("input[name=name]").setValue("test");
    await wrapper.find("input[name=password]").setValue("123456");

    await Vue.nextTick();

    // Check that the room data was properly set
    expect(wrapper.find("input[name=name]").element.value).toEqual("test");
    expect(wrapper.find("input[name=password]").element.value).toEqual("123456");
  });

  it("Should send a post request with correct data on submit", async () => {
    await wrapper.find("input[name=name]").setValue("test");
    await wrapper.find("input[name=password]").setValue("123456");

    await Vue.nextTick();

    wrapper.find("button[name=save]").trigger("click");

    // Check if a post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if a post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if a post was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(url, {
      name: "test",
      password: "123456",
      user: {
        _id: "321testid",
        createdDate: "2021-04-20T01:01:22.269Z",
        email: "test@mail.js",
        username: "testUser",
      },
    });
  });

  it("Should emit close dialog event", async () => {
    await wrapper.find("input[name=name]").setValue("test");
    await wrapper.find("input[name=password").setValue("123456");

    await Vue.nextTick();

    wrapper.findAll("button[name=save]").trigger("click");

    expect(wrapper.emitted()).toBeTruthy();
  });
});

describe("Behavioral test for AddRoomModal.vue - failed HTTP post", () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);
  });

  it("Should display errors", async () => {
    await wrapper.setData({
      room: {
        name: "room name",
        password: "123456",
      },
    });

    await Vue.nextTick();

    await wrapper.find("button[name=save]").trigger("click");

    await Vue.nextTick();

    expect(wrapper.findAll(".v-messages").length).toEqual(2);
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Name error");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("Password error");
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it("Should reset errors on keyup event", async () => {
    await wrapper.setData({
      room: {
        name: "room name",
        password: "123456",
      },
    });

    await Vue.nextTick();

    await wrapper.findAll("button[name=save]").trigger("click");

    await Vue.nextTick();

    // Check if errors are visible
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Name error");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("Password error");

    await wrapper.findAll("input").trigger("keyup");

    // Check if keyup event restored messages
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Required");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");
  });

  it("Should reset errors on close event", async () => {
    await wrapper.setData({
      room: {
        name: "room name",
        password: "123456",
      },
    });

    await Vue.nextTick();

    await wrapper.find("button[name=save]").trigger("click");

    await Vue.nextTick();

    // Check if errors are visible
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Name error");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("Password error");

    await wrapper.find("button[name=close]").trigger("click");

    // Check if closing restored messages
    expect(wrapper.findAll(".v-messages").at(0).text()).toEqual("Required");
    expect(wrapper.findAll(".v-messages").at(1).text()).toEqual("");
  });
});
