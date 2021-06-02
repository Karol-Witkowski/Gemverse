import { createLocalVue, mount } from '@vue/test-utils';
import MockedSocket from 'socket.io-mock';
import axios from 'axios';
import io from 'socket.io-client';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ChatInput from '@/components/chat/ChatInput.vue';

const localVue = createLocalVue();
let socket;
const url = 'http://localhost:3000/api/messages/room-name';
const vuetify = new Vuetify();
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
    data: 'testMessageData',
    success: true,
  },
};

beforeEach(() => {
  wrapper = mount(ChatInput, {
    localVue,
    mocks: {
      $store: {
        getters: {
          getCurrentRoom: {
            _id: '123testid',
            slug: 'room-name',
          },
          getUserInfo: {
            _id: '321testid',
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
      };
    },
  });
});

afterEach(() => {
  jest.resetAllMocks();
  wrapper.destroy();
});

jest.mock('axios');
jest.mock('socket.io-client');

describe('Implementation test for ChatInput.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    socket = new MockedSocket();
    io.mockReturnValue(socket);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    wrapper.destroy();
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Check that socket connection is established', () => {
    expect(io.connect).toHaveBeenCalled();
  });

  it('Should emit a new message', () => {
    socket.on('sendMessage', (data) => {
      expect(data).toEqual('message');
    });
  });

  it('Initializes with correct elements', () => {
    // Check buttons initial state
    expect(wrapper.findAll('button').length).toEqual(2);
    expect(wrapper.findAll('button').at(0).text()).toMatch('cancel');
    expect(wrapper.findAll('button').at(1).text()).toMatch('send');

    // Check input initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(1);
    expect(wrapper.find('input[name=message]').text()).toEqual('');

    // Check validation initial state
    expect(wrapper.findAll('.v-messages').length).toEqual(1);
    expect(wrapper.find('.v-messages').text()).toEqual('');
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it('Enables error messages', async () => {
    await wrapper.setData({
      inputError: 'Input error',
    });

    expect(wrapper.findAll('.v-messages').length).toEqual(1);
    expect(wrapper.find('.v-messages').text()).toEqual('Input error');
  });

  it('Pass validation when a message is entered', async () => {
    await wrapper.setData({
      message: 'message',
    });

    // Check that message was entered
    expect(wrapper.find('input[name=message').element.value).toEqual('message');
    expect(wrapper.vm.message).toBe('message');

    // Check if validation pass
    expect(wrapper.vm.isFormValid).toBeTruthy();
  });

  it('Should send a post request with a message on form submit', async () => {
    await wrapper.setData({
      message: 'message',
    });

    wrapper.vm.sendMessage();

    // Check if a post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if a post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if a post was called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      url,
      {
        message: 'message',
        room: '123testid',
        user: '321testid',
      },
    );
  });
});

describe('Implementation test for ChatInput.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);
  });

  it('Display messages on post error', async () => {
    await wrapper.vm.sendMessage();

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(1);
    expect(wrapper.find('.v-messages').text()).toEqual('Message error');
    expect(wrapper.vm.isformValid).toBeFalsy();
  });
});

describe('Behavioral test for ChatInput.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);
  });

  it('Pass validation when a message is entered', async () => {
    await wrapper.find('input[name=message').setValue('message');

    // Check that message was entered
    expect(wrapper.find('input[name=message').element.value).toEqual('message');
    expect(wrapper.vm.message).toBe('message');

    // Check if validation pass
    expect(wrapper.vm.isFormValid).toBeTruthy();
  });

  it('Should send a post request with a message on form submit', async () => {
    await wrapper.find('input[name=message').setValue('message');

    wrapper.findAll('button').at(1).trigger('click');

    // Check if a post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if a post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if a post was called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      url,
      {
        message: 'message',
        room: '123testid',
        user: '321testid',
      },
    );
  });

  it('Reset message on input clear', async () => {
    await wrapper.find('input[name=message').setValue('message');

    // Check that message was entered
    expect(wrapper.find('input[name=message').element.value).toEqual('message');

    await wrapper.findAll('button').at(0).trigger('click');

    // Check that message was cleared
    expect(wrapper.find('input[name=message').element.value).toEqual('');
  });

  it('Clear empty input error on keyup event', async () => {
    await wrapper.setData({
      inputError: 'Input error',
    });

    // Check if an error is visible
    expect(wrapper.find('.v-messages').text()).toEqual('Input error');

    await wrapper.find('input[name=message').trigger('keyup');

    // Check error message content
    expect(wrapper.find('.v-messages').text()).toEqual('');
  });
});

describe('Behavioral test for ChatInput.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);
  });

  it('Display errors on failed post', async () => {
    await wrapper.findAll('button').at(1).trigger('click');

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(1);
    expect(wrapper.find('.v-messages').text()).toEqual('Message error');
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it('Clear post failure error on keyup event', async () => {
    await wrapper.find('input[name=message').setValue('message');
    await wrapper.findAll('button').at(1).trigger('click');

    await Vue.nextTick();

    // Check if an error is visible
    expect(wrapper.find('.v-messages').text()).toEqual('Message error');

    await wrapper.find('input[name=message').trigger('keyup');

    // Check error message content
    expect(wrapper.find('.v-messages').text()).toEqual('');
  });
});
