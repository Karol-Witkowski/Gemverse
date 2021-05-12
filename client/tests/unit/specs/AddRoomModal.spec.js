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
    auth:	true,
    data: {
      data: 'testData',
    },
    success: true,
    token: 'testToken',
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
      propsData: {
        message: '',
      },
    });
  });

  afterEach(() => {
    axios.post.mockReset();
    wrapper.destroy();
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  /* it('Initializes with correct elements', () => {
    // Test buttons initial state
    expect(wrapper.findAll('.v-btn').length).toEqual(4);
    expect(wrapper.findAll('.v-btn').at(0).text()).toMatch('ok');
    expect(wrapper.findAll('.v-btn').at(1).text()).toMatch('back');
    expect(wrapper.findAll('.v-btn').at(2).text()).toMatch('sign in');
    expect(wrapper.findAll('.v-btn').at(3).text()).toMatch('sign up');
    expect(wrapper.findAll('.v-btn').at(2).element.disabled).toBeTruthy();

    // Test auth alert initial state
    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('whiteSpace');

    // Test inputs initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(2);
    expect(wrapper.findAll('input').at(0).text()).toEqual('');
    expect(wrapper.findAll('input').at(1).text()).toEqual('');

    // Test validation initial state
    expect(wrapper.findAll('.v-messages').length).toEqual(2);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('');
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it('Enables error messages', async () => {
    await wrapper.setData({
      passwordError: 'Password error',
      userError: 'Email error',
    });

    expect(wrapper.findAll('.v-messages').length).toEqual(2);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Email error');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Password error');
  });

  it('Enables log-in button when email address and password are set', async () => {
    await wrapper.setData({
      email: 'email value',
      password: 'password value',
    });

    await Vue.nextTick();

    // Check that the user data was properly set
    expect(wrapper.findAll('input').at(0).element.value).toEqual('email value');
    expect(wrapper.findAll('input').at(1).element.value).toEqual('password value');
    expect(wrapper.vm.email).toBe('email value');
    expect(wrapper.vm.password).toBe('password value');

    // Check if validation pass
    expect(wrapper.vm.isFormValid).toBeTruthy();

    // Check that the save button is active
    expect(wrapper.findAll('.v-btn').at(2).element.disabled).toBeFalsy();
  });

  it('Fail validation when one field is empty', async () => {
    await wrapper.setData({
      email: 'email value',
    });

    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it('Should sends post request with correct on form submit', async () => {
    await wrapper.setData({
      email: 'email value',
      password: 'password value',
    });

    await wrapper.vm.AddRoomModal();

    // Check if post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if post was called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      url,
      {
        email: 'email value',
        password: 'password value',
      },
    );
  });
});

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
