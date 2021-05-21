import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PrivateRoomModal from '@/components/room/PrivateRoomModal.vue';

const localVue = createLocalVue();
const url = 'http://localhost:3000/api/room/verification';
let vuetify;
let wrapper;
const mockRouter = {
  push: jest.fn(),
};
const mockStore = {
  getters: {
    getCurrentRoom: {
      name: 'name',
    },
  },
};
const error = {
  response: {
    data: {
      message: 'error',
    },
  },
};
const response = {
  data: {
    data: {
      slug: 'slug',
    },
  },
};

jest.mock('axios');
vuetify = new Vuetify();

describe('Implementation test for PrivateRoomModal.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    wrapper = mount(PrivateRoomModal, {
      localVue,
      mocks: {
        $router: mockRouter,
        $store: mockStore,
      },
      vuetify,
      data() {
        return {
          isFormValid: false,
          privateRoomPassword: '',
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

  it('Initializes with correct elements', () => {
    // Test buttons initial state
    expect(wrapper.findAll('button').length).toEqual(2);
    expect(wrapper.findAll('button').at(0).text()).toMatch('close');
    expect(wrapper.findAll('button').at(1).text()).toMatch('enter');
    expect(wrapper.findAll('button').at(1).element.disabled).toBeTruthy();

    // Test inputs initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(1);
    expect(wrapper.findAll('input').at(0).text()).toEqual('');

    // Test validation initial state
    expect(wrapper.findAll('.v-messages').length).toEqual(1);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it('Set input data correctly', async () => {
    // Check inputs initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(1);
    expect(wrapper.findAll('input').at(0).text()).toEqual('');

    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await Vue.nextTick();

    // Check that the password was properly set
    expect(wrapper.findAll('input').at(0).element.value).toEqual('123456');
  });

  it('Fail validation on empty input', () => {
    // Check initial input value
    expect(wrapper.findAll('input').at(0).text()).toEqual('');

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeFalsy();

    // Check that correct input message is displayed
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
  });

  it('Enables enter room button on validation pass', async () => {
    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await Vue.nextTick();

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeTruthy();

    // Check that correct input message are displayed
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');

    // Check that the enter button is active
    expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy();
  });

  it('Should sends post request with correct data on submit', async () => {
    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await Vue.nextTick();

    wrapper.vm.passwordValidation();

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
      },
    );
  });

  it('Push user to room', async () => {
    wrapper.vm.join();

    // Check if router push was called
    expect(mockRouter.push).toHaveBeenCalled();

    // Check if router push was called one time
    expect(mockRouter.push).toHaveBeenCalledTimes(1);

    // Check if router push was called with correct object
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'Room',
      params: { slug: undefined },
    });
  });

  it('Should emit close dialog event', async () => {
    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await wrapper.vm.closeModal();

    expect(wrapper.emitted().closeModal).toBeTruthy();
    expect(wrapper.emitted().closeModal.length).toBe(1);
  });
});

describe('Implementation test for PrivateRoomModal.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);

    wrapper = mount(PrivateRoomModal, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      vuetify,
      data() {
        return {
          error: '',
          isFormValid: false,
          privateRoomPassword: '',
        };
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.destroy();
  });

  it('Should display errors', async () => {
    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await Vue.nextTick();

    await wrapper.vm.passwordValidation();

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(1);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('error');
    expect(wrapper.vm.isformValid).toBeFalsy();
  });
});

describe('Behavioral test for PrivateRoomModal.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    wrapper = mount(PrivateRoomModal, {
      localVue,
      mocks: {
        $router: mockRouter,
        $store: mockStore,
      },
      vuetify,
      data() {
        return {
          isFormValid: false,
          privateRoomPassword: '',
        };
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.destroy();
  });

  it('Should not sends post request when input is empty', async () => {
    await wrapper.findAll('button').at(1).trigger('click');

    expect(axios.post).not.toHaveBeenCalled();
  });

  it('Set input data correctly', async () => {
    await wrapper.findAll('input').at(0).setValue('123456');

    await Vue.nextTick();

    // Check that the password was properly set
    expect(wrapper.findAll('input').at(0).element.value).toEqual('123456');
  });

  it('Should send post request on submit', async () => {
    await wrapper.findAll('input').at(0).setValue('123456');

    await Vue.nextTick();

    wrapper.findAll('button').at(1).trigger('click');

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
      },
    );
  });
});

describe('Behavioral test for PrivateRoomModal.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);

    wrapper = mount(PrivateRoomModal, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      vuetify,
      data() {
        return {
          error: '',
          isFormValid: false,
          privateRoomPassword: '',
        };
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.destroy();
  });

  it('Should reset errors on keyup event', async () => {
    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await Vue.nextTick();

    await wrapper.findAll('button').at(1).trigger('click');

    await Vue.nextTick();

    // Check if error is visible
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('error');

    await wrapper.findAll('input').trigger('keyup');

    // Check if keyup event reset error
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
  });

  it('Should reset error on close event', async () => {
    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await Vue.nextTick();

    await wrapper.findAll('button').at(1).trigger('click');

    await Vue.nextTick();

    // Check if error is visible
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('error');

    await wrapper.findAll('button').at(0).trigger('click');

    // Check if closing modal reset error
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
  });
});
