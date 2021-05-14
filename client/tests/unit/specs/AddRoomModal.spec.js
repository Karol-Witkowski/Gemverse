import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import io from 'socket.io-client';
import MockedSocket from 'socket.io-mock';
import Vue from 'vue';
import Vuetify from 'vuetify';
import AddRoomModal from '@/components/room/AddRoomModal.vue';

const localVue = createLocalVue();
let socket;
const url = 'http://localhost:3000/api/room';
let vuetify;
let wrapper;
const mockStore = {
  getters: {
    getUserInfo: {
      createdDate: '2021-04-20T01:01:22.269Z',
      email: 'test@mail.js',
      _id: '321testid',
      username: 'testUser',
    },
  },
};
const error = {
  response: {
    data: {
      password: 'Password error',
      user: 'Email error',
    },
  },
};
const response = {
  data: {
    data: {
      data: 'testData',
      success: true,
    },
  },
};

jest.mock('axios');
jest.mock('socket.io-client');
vuetify = new Vuetify();

describe('Implementation test for AddRoomModal.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    socket = new MockedSocket();
    io.mockReturnValue(socket);

    wrapper = mount(AddRoomModal, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      stubs: [
        'router-link',
        'router-view',
      ],
      vuetify,
      data() {
        return {
          error: [],
          isFormValid: false,
          nameError: '',
          room: {
            name: '',
            password: '',
          },
        };
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.destroy();
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Check that socket connection is established', () => {
    expect(io.connect).toHaveBeenCalled();
  });

  it('Should emit new room data', () => {
    socket.on('createRoom', (data) => {
      expect(data).toEqual('roomData');
    });
  });

  it('Initializes with correct elements', () => {
    // Test buttons initial state
    expect(wrapper.findAll('.v-btn').length).toEqual(2);
    expect(wrapper.findAll('.v-btn').at(0).text()).toMatch('close');
    expect(wrapper.findAll('.v-btn').at(1).text()).toMatch('save');
    expect(wrapper.findAll('.v-btn').at(1).element.disabled).toBeTruthy();

    // Test inputs initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(2);
    expect(wrapper.findAll('input').at(0).text()).toEqual('');
    expect(wrapper.findAll('input').at(1).text()).toEqual('');

    // Test validation initial state
    expect(wrapper.findAll('.v-messages').length).toEqual(2);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Required');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('');
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it('Set input data correctly', async () => {
    // Check inputs initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(2);
    expect(wrapper.findAll('input').at(0).text()).toEqual('');
    expect(wrapper.findAll('input').at(1).text()).toEqual('');

    await wrapper.setData({
      room: {
        name: 'test',
        password: '123456',
      },
    });

    await Vue.nextTick();

    // Check that the room data was properly set
    expect(wrapper.findAll('input').at(0).element.value).toEqual('test');
    expect(wrapper.findAll('input').at(1).element.value).toEqual('123456');
  });

  it('Pass validation when only name was entered', async () => {
    await wrapper.setData({
      room: {
        name: 'room name',
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeTruthy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Required');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('')
  });

  it('Fail validation when room name character range is invalid', async () => {
    await wrapper.setData({
      room: {
        name: '1',
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeFalsy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Characters range: 3 - 15');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('');
  });


  it('Fail validation when only password was entered', async () => {
    await wrapper.setData({
      room: {
        password: '123456',
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeFalsy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Required');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('');
  });

  it('Fail validation when password contains whitespace', async () => {
    await wrapper.setData({
      room: {
        name: 'test',
        password: '123 456',
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeFalsy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Required');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('No blank spaces allowed');
  });

  it('Fail validation when room password character range is invalid', async () => {
    await wrapper.setData({
      room: {
        name: 'test',
        password: '123',
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeFalsy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Required');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Password must be at least 6 characters long');
  });

  it('Enables save room button on validation pass', async () => {
    await wrapper.setData({
      room: {
        name: 'room name',
        password: '123456',
      },
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeTruthy();

    // Check that correct input messages are displayed
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Required');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('');

    // Check that the save button is active
    expect(wrapper.findAll('.v-btn').at(1).element.disabled).toBeFalsy();
  });

  it('Should sends post request with correct data on submit', async () => {
    await wrapper.setData({
      room: {
        name: 'name',
        password: '123456',
      },
    });

    await Vue.nextTick();

    wrapper.vm.formValidation();

    // Check if post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if post was called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      url,
      {
        name: 'name',
        password: '123456',
        user: {
          _id: '321testid',
          createdDate: '2021-04-20T01:01:22.269Z',
          email: 'test@mail.js',
          username: "testUser",
        },
      },
    );
  });

  it('Should emit close dialog event', async () => {
    await wrapper.setData({
      room: {
        name: 'room name',
        password: '123456',
      },
    });

    await wrapper.vm.createRoom();

    expect(wrapper.emitted().closeModal).toBeTruthy();
    expect(wrapper.emitted().closeModal.length).toBe(1);
  });

/* });

describe('Implementation test for AddRoomModal.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);

    wrapper = mount(AddRoomModal, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      stubs: [
        'router-link',
        'router-view',
      ],
      vuetify,
      data() {
        return {
          email: '',
          isFormValid: false,
          password: '',
          passwordError: '',
          userError: '',
        };
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('Display error messages on HTTP post failure', async () => {
    await wrapper.vm.AddRoomModal();

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(2);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Email error');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Password error');
  }); */
});
