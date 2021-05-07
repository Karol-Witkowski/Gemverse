import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
// import io from 'socket.io-client';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ChatInput from '@/components/chat/ChatInput.vue';

const mockStore = { dispatch: jest.fn() };
const localVue = createLocalVue();
// const url = `http://localhost:3000/api/messages/${this.getCurrentRoom.slug}`;
let vuetify;
let wrapper;
const error = {
  response: {
    data: {
      errors: {
        message: {
          msg: 'Email error',
        },
      },
    },
  },
};
const response = {
  data: {
    data: {
      data: 'testData',
    },
    success: true,
  },
};

jest.mock('axios');
jest.mock('socket.io-client', () => {
  const mSocket = {
    on: jest.fn()
  };
  return jest.fn(() => mSocket);
});
vuetify = new Vuetify();

describe('Implementation test for ChatInput.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    wrapper = mount(ChatInput, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      vuetify,
      data() {
        return {
          inputError: '',
          isFormValid: false,
          message: '',
          // socket: io('http://localhost:3000'),
        };
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(2);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Email error');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Password error');
  }); */
});
