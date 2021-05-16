import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import RoomList from '@/components/room/RoomList.vue';

const localVue = createLocalVue();
let socket;
const url = 'http://localhost:3000/api/room';
let vuetify;
let wrapper;
const mockStore = {
  dispatch: jest.fn(),
  getters: {
    getUserInfo: {
      createdDate: '2021-04-20T01:01:22.269Z',
      email: 'test@mail.js',
      _id: '321testid',
      username: 'testUser',
    },
  },
};
const getError = {
  response: {
    data: {
      message: 'error',
    },
  },
};
const getResponse = {
  data: {
    data: {
      0: {
        name: 'testRoom',
        access: 'public',
        slug: 'testRoom',
        createdDate: '2021-02-20T01:01:22.269Z',
      },
      1: {
        name: 'newtRoom',
        access: 'public',
        slug: 'testRoom,',
        createdDate: '2021-03-20T01:01:22.269Z',
      },
    },
    success: true,
  },
};
const deleteError = {
  response: {
    data: {
      error: 'error',
    },
  },
};
const deleteResponse = {
  data: {
    data: 'testMessageData',
    success: true,
  },
};

jest.mock('axios');
vuetify = new Vuetify();

describe('Implementation test for RoomList.vue - successful HTTP get/delete', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(getResponse);
    axios.delete.mockResolvedValue(deleteResponse);

    wrapper = mount(RoomList, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      vuetify,
      data() {
        return {
          addRoomModal: false,
          roomError: '',
          deleteRoomModal: false,
          id: '',
          privateRoomModal: false,
          rooms: [],
          sortBy: 'Sort by given name',
          sorting: -1,
          toggleSort: false,
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

  /*it('Initializes with correct elements', () => {
    // Test buttons initial state
    expect(wrapper.findAll('button').length).toEqual(2);
    expect(wrapper.findAll('button').at(0).text()).toMatch('close');
    expect(wrapper.findAll('button').at(1).text()).toMatch('save');
    expect(wrapper.findAll('button').at(1).element.disabled).toBeTruthy();

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
    expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy();
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
  });*/
});
