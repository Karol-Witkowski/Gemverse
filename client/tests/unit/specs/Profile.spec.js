import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Profile from '@/components/profile/Profile.vue';

const localVue = createLocalVue();
const mockRouter = {
  push: jest.fn(),
};
const url = 'http://localhost:3000/api/user/remove/logged';
let vuetify;
let wrapper;
const error = {
  response: {
    data: {
      error: 'Error msg',
    },
  },
};

jest.mock('axios');
jest.spyOn(window.localStorage.__proto__, 'clear');
vuetify = new Vuetify();
document.body.setAttribute('data-app', true);

describe('Implementation test for Profile.vue - successful HTTP post', () => {
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

  beforeEach(() => {
    axios.delete.mockResolvedValue();

    wrapper = mount(Profile, {
      localVue,
      mocks: {
        $router: mockRouter,
        $store: mockStore,
      },
      stubs: [
        'router-link',
        'router-view',
      ],
      vuetify,
      data() {
        return {
          deleteError: '',
          deleteUserModal: false,
        };
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    wrapper.destroy();
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Initializes with correct elements', () => {
    // Check data binding
    expect(wrapper.findAll('span').at(0).text()).toMatch('testUser');
    expect(wrapper.findAll('span').at(1).text()).toMatch('test@mail.js');
    expect(wrapper.findAll('span').at(2).text()).toMatch('Tuesday, April 20 2021');

    // Check that error message is not visible
    expect(wrapper.find('.errorMessage').exists()).toBeFalsy();
  });

  it('Should sends delete request with correct data on account delete', async () => {
    await wrapper.vm.deleteUser();

    // Check if post was called
    expect(axios.delete).toHaveBeenCalled();

    // Check if post was called once
    expect(axios.delete).toHaveReturnedTimes(1);

    // Check if post was called with correct data
    expect(axios.delete).toHaveBeenCalledWith(
      url,
      {
        _id: '321testid',
        createdDate: '2021-04-20T01:01:22.269Z',
        email: 'test@mail.js',
        username: 'testUser',
      },
    );
  });

  it('Should call dispatch method on delete account', async () => {
    await wrapper.vm.deleteUser();

    // Check if any action were dispatched
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if one action was dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(1);

    // Check if action was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'resetState',
      true,
    );
  });

  it('Should call store clear method on delete account', async () => {
    await wrapper.vm.deleteUser();

    // Check if local storage clear method was called
    expect(localStorage.clear).toHaveBeenCalled();

    // Check if local storage clear method was called once
    expect(localStorage.clear).toHaveReturnedTimes(1);
  });

  it('Redirect user to login page on account delete', async () => {
    await wrapper.vm.deleteUser();

    // Check if router push was called
    expect(mockRouter.push).toHaveBeenCalled();

    // Check if router push was called one time
    expect(mockRouter.push).toHaveBeenCalledTimes(1);

    // Check if router push was called with correct object
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'Login',
      params: { message: 'Account deleted' },
    });
  });

  it('Should clear errors and close modal on canceled account delete', async () => {
    await wrapper.setData({
      deleteError: 'error',
      deleteUserModal: true,
    });

    await wrapper.vm.closeModal();

    expect(wrapper.vm.deleteError).toMatch('');
    expect(wrapper.vm.deleteUserModal).toBeFalsy();
  });
});

describe('Implementation test for Profile.vue - failed HTTP post', () => {
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

  beforeEach(() => {
    axios.delete.mockRejectedValue(error);

    wrapper = mount(Profile, {
      localVue,
      mocks: {
        $router: mockRouter,
        $store: mockStore,
      },
      stubs: [
        'router-link',
        'router-view',
      ],
      vuetify,
      data() {
        return {
          deleteError: '',
          deleteUserModal: false,
        };
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    wrapper.destroy();
  });

  it('Should display error on account delete failure', async () => {
    await wrapper.setData({
      deleteUserModal: true,
    });
    await wrapper.vm.deleteUser();

    await Vue.nextTick();

    expect(wrapper.vm.deleteError).toBe('Error msg');
    expect(wrapper.find('.errorMessage').exists()).toBeTruthy();
    expect(wrapper.findAll('.errorMessage').at(0).text()).toBe('Error msg');
  });
});
