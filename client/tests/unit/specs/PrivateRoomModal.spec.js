import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PrivateRoomModal from '@/components/room/PrivateRoomModal.vue';

const localVue = createLocalVue();
const url = 'http://localhost:3000/api/room/verification';
const vuetify = new Vuetify();
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

beforeEach(() => {
  wrapper = mount(PrivateRoomModal, {
    localVue,
    mocks: {
      $router: mockRouter,
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

describe('Implementation test for PrivateRoomModal.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Initializes with correct elements', () => {
    // Check buttons initial state
    expect(wrapper.findAll('button').length).toEqual(2);
    expect(wrapper.find('button[name=close]').text()).toMatch('close');
    expect(wrapper.find('button[name=enter]').text()).toMatch('enter');
    expect(wrapper.find('button[name=enter]').element.disabled).toBeTruthy();

    // Check inputs initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(1);
    expect(wrapper.find('input[name=password]').text()).toEqual('');

    // Check validation initial state
    expect(wrapper.findAll('.v-messages').length).toEqual(1);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it('Set input data correctly', async () => {
    // Check inputs initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(1);
    expect(wrapper.find('input[name=password]').text()).toEqual('');

    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await Vue.nextTick();

    // Check that the password was properly set
    expect(wrapper.find('input[name=password]').element.value).toEqual('123456');
  });

  it('Fail validation on empty input', () => {
    // Check initial input value
    expect(wrapper.find('input[name=password]').text()).toEqual('');

    // Check validation state
    expect(wrapper.vm.isFormValid).toBeFalsy();

    // Check that the correct input message is displayed
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
    expect(wrapper.find('button[name=enter]').element.disabled).toBeFalsy();
  });

  it('Should send a post request with correct data on submit', async () => {
    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await Vue.nextTick();

    wrapper.vm.passwordValidation();

    // Check if a post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if a post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if a post was called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      url,
      {
        name: 'name',
        password: '123456',
      },
    );
  });

  it('Push user to the room', async () => {
    wrapper.vm.join();

    // Check if router push was called
    expect(mockRouter.push).toHaveBeenCalled();

    // Check if router push was called once
    expect(mockRouter.push).toHaveBeenCalledTimes(1);

    // Check if router push was called with the correct object
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
  });

  it('Should not send post request when input is empty', async () => {
    await wrapper.find('[name=enter]').trigger('click');

    expect(axios.post).not.toHaveBeenCalled();
  });

  it('Set input data correctly', async () => {
    await wrapper.find('input[name=password]').setValue('123456');

    await Vue.nextTick();

    // Check that the password was properly set
    expect(wrapper.find('input[name=password]').element.value).toEqual('123456');
  });

  it('Should send post request on submitting', async () => {
    await wrapper.find('input[name=password]').setValue('123456');

    await Vue.nextTick();

    wrapper.find('button[name=enter]').trigger('click');

    // Check if a post was called
    expect(axios.post).toHaveBeenCalled();

    // Check if a post was called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if a post was called with correct data
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
  });

  it('Should reset errors on keyup event', async () => {
    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await Vue.nextTick();

    await wrapper.find('[name=enter]').trigger('click');

    await Vue.nextTick();

    // Check if an error is visible
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('error');

    await wrapper.find('input[name=password]').trigger('keyup');

    // Check if keyup event reset error
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
  });

  it('Should reset error on close event', async () => {
    await wrapper.setData({
      privateRoomPassword: '123456',
    });

    await Vue.nextTick();

    await wrapper.find('[name=enter]').trigger('click');

    await Vue.nextTick();

    // Check if an error is visible
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('error');

    await wrapper.find('button[name=close]').trigger('click');

    // Check if closing modal reset error
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
  });
});
