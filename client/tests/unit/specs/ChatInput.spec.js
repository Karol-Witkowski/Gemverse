import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
// import io from 'socket.io-client';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ChatInput from '@/components/chat/ChatInput.vue';

const localVue = createLocalVue();
const url = 'http://localhost:3000/api/messages/room-name';
let vuetify;
let wrapper;
const error = {
  response: {
    data: {
      errors: {
        message: {
          msg: 'Message error',
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
vuetify = new Vuetify();

describe('Implementation test for ChatInput.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    wrapper = mount(ChatInput, {
      localVue,
      mocks: {
        $store: {
          getters: {
            getCurrentRoom: {
              _id:"123testid",
              slug:"room-name",
            },
            getUserInfo: {
              _id:"321testid",
            },
          },
        },
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

  it('Initializes with correct elements', () => {
    // Test buttons initial state
    expect(wrapper.findAll('button').length).toEqual(2);
    expect(wrapper.findAll('button').at(0).text()).toMatch('cancel');
    expect(wrapper.findAll('button').at(1).text()).toMatch('send');

    // Test input initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(1);
    expect(wrapper.findAll('input').at(0).text()).toEqual('');

    // Test validation initial state
    expect(wrapper.findAll('.v-messages').length).toEqual(1);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it('Enables error messages', async () => {
    await wrapper.setData({
      inputError: 'Input error',
    });

    expect(wrapper.findAll('.v-messages').length).toEqual(1);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Input error');
  });

  it('Pass validation when message is entered', async () => {
    await wrapper.setData({
      message: 'message',
    });

    // Check that message was entered
    expect(wrapper.findAll('input').at(0).element.value).toEqual('message');
    expect(wrapper.vm.message).toBe('message');

    // Check if validation pass
    expect(wrapper.vm.isFormValid).toBeTruthy();
  });

  it('Should sends post request with message on form submit', async () => {
    await wrapper.setData({
      message: 'message',
    });

    wrapper.vm.sendMessage();

    // Check if post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if post are called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if post was called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      url,
      {
        "message": "message",
        "room": "123testid",
        "user": "321testid",
      },
    );
  });
});
