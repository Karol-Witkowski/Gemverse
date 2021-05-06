import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Register from '@/components/authentication/Register.vue';

const mockStore = { dispatch: jest.fn() };
const localVue = createLocalVue();
const url = 'http://localhost:3000/api/authentication/register';
let vuetify;
let wrapper;
const error = {
  response: {
    data: {
      errors: {
        email: {
          msg: 'Email error',
        },
        username: {
          msg: 'Username error',
        },
      },
    },
  },
};
const expectedData = expect.objectContaining({
  email: 'test@email.js',
  password: 'password',
  username: 'username',
});
const response = {
  data: {
    auth:	true,
    user: {
      data: 'testData',
    },
    success: true,
    token: 'testToken',
  },
};

jest.mock('axios');
vuetify = new Vuetify();

describe('Implementation test for Register.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    wrapper = mount(Register, {
      localVue,
      mocks: {
        $store: mockStore
      },
      stubs: ['router-link', 'router-view'],
      vuetify,
      data() {
        return {
          email: '',
          emailError: '',
          isFormValid: false,
          password: '',
          username: '',
          usernameError: '',
        };
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

  it('Initializes with correct elements', () => {
    // Test buttons initial state
    expect(wrapper.findAll('.v-btn').length).toEqual(3);
    expect(wrapper.findAll('.v-btn').at(0).text()).toMatch('back');
    expect(wrapper.findAll('.v-btn').at(1).text()).toMatch('sign up');
    expect(wrapper.findAll('.v-btn').at(2).text()).toMatch('sign in');
    expect(wrapper.findAll('.v-btn').at(1).element.disabled).toBeTruthy();

    // Test inputs initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(3);
    expect(wrapper.findAll('input').at(0).text()).toEqual('');
    expect(wrapper.findAll('input').at(1).text()).toEqual('');
    expect(wrapper.findAll('input').at(2).text()).toEqual('');

    // Test validation initial state
    expect(wrapper.findAll('.v-messages').length).toEqual(3);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('');
    expect(wrapper.findAll('.v-messages').at(2).text()).toEqual('Minimum length - 6 characters');
    expect(wrapper.vm.isformValid).toBeFalsy();
  });

  it('Enables error messages', async () => {
    await wrapper.setData({
      emailError: 'Email error',
      usernameError: 'Username error',
    });

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(3);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Username error');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Email error');
  });

  it('Enables sign up button when user data is set', async () => {
    await wrapper.setData({
      email: 'test@email.js',
      password: 'password',
      username: 'username',
    });

    await Vue.nextTick();

    // Check that the user data is properly set
    expect(wrapper.findAll('input').at(0).element.value).toEqual('username');
    expect(wrapper.findAll('input').at(1).element.value).toEqual('test@email.js');
    expect(wrapper.findAll('input').at(2).element.value).toEqual('password');
    expect(wrapper.vm.username).toBe('username');
    expect(wrapper.vm.email).toBe('test@email.js');
    expect(wrapper.vm.password).toBe('password');

    await Vue.nextTick();
    // Check if validation pass
    expect(wrapper.vm.isFormValid).toBeTruthy();

    // Check that the Register button is active
    expect(wrapper.findAll('.v-btn').at(1).element.disabled).toBeFalsy();
  });

 it('Fail validation when user data is not entered', () => {
    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it('Fail validation when only one field is entered', async () => {
    await wrapper.setData({
      email: 'email value',
    });

    await Vue.nextTick();

    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it('Should sends post request with correct on form submit', async () => {
    await wrapper.setData({
      email: 'test@email.js',
      password: 'password',
      username: 'username',
    });

    await Vue.nextTick();

    wrapper.vm.createUser();

    // Check if post is called
    expect(axios.post).toHaveBeenCalled();

    // Check if post are called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if post is called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      url,
      expectedData,
    );
  });

  it('Should store user data and auth status after successful Register', async () => {
    wrapper.vm.createUser();

    // Check if any action are dispatched
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if two actions are dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(2);

    // Check auth state is dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      1, 'remitAuthState', true,
    );

    // Check user data is dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      2, 'saveUser', response.data.user,
    );
  });
//});

/* describe('Implementation test for Register.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);

    wrapper = mount(Register, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      stubs: ['router-link', 'router-view'],
      vuetify,
      data() {
        return {
          email: '',
          emailError: '',
          isFormValid: false,
          password: '',
          usernameError: '',
          username: '',
        };
      },
    });
  });

  afterEach(() => {
    mockStore.dispatch.mockReset();
    wrapper.destroy();
  });

  it('Display error messages on HTTP post failure', async () => {
    await wrapper.vm.Register();

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(3);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Username error');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Email error');
    expect(wrapper.findAll('.v-messages').at(2).text()).toEqual('Password error');
  });

  it('Does not dispatch data when a failed HTTP post occurs', () => {
    wrapper.vm.Register();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
});

describe('Behavioral test for Register.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    wrapper = mount(Register, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      stubs: ['router-link', 'router-view'],
      vuetify,
      data() {
        return {
          email: '',
          isFormValid: false,
          password: '',
          username: '',
        };
      },
    });
  });

  afterEach(() => {
    axios.post.mockReset();
    wrapper.destroy();
  });

  it('Should not sends post request when inputs are empty', async () => {
    wrapper.findAll('.v-btn').at(1).trigger('click');

    expect(axios.post).not.toHaveBeenCalled();
  });

  it('Should sends post request with correct on form submit', async () => {
    await wrapper.findAll('input').at(0).setValue('username value');
    await wrapper.findAll('input').at(1).setValue('email value');
    await wrapper.findAll('input').at(2).setValue('password value');

    await Vue.nextTick();

    wrapper.findAll('.v-btn').at(2).trigger('click');

    // Check if sing in button is clicked
    expect(axios.post).toHaveBeenCalled();

    // Check if post are called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if post is called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      url,
      expectedData,
    );
  });

  it('Should store user data and auth status after successful Register', () => {
    wrapper.findAll('.v-btn').at(1).trigger('click');

    // Check if any action are dispatched
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if two actions are dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(2);

    // Check auth state is dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      1, 'remitAuthState', true,
    );

    // Check user data is dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      2, 'saveUser', response.data.data,
    );
  });
});

describe('Behavioral test for Register.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);

    wrapper = mount(Register, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      stubs: ['router-link', 'router-view'],
      vuetify,
      data() {
        return {
          email: '',
          emailError: '',
          isFormValid: false,
          password: '',
          usernameError: '',
          username: '',
        };
      },
    });
  });

  afterEach(() => {
    mockStore.dispatch.mockReset();
    wrapper.destroy();
  });

  it('Display error messages on HTTP post failure', async () => {
    await wrapper.findAll('input').at(0).setValue('username value');
    await wrapper.findAll('input').at(1).setValue('email value');
    await wrapper.findAll('input').at(2).setValue('password value');

    await Vue.nextTick();

    await wrapper.findAll('.v-btn').at(1).trigger('click');

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(3);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Username error');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Email error');
    expect(wrapper.findAll('.v-messages').at(2).text()).toEqual('?_?_?');
  });

  it('Hide HTTP post error messages when user enter new data', async () => {
    await wrapper.setData({
      emailError: 'Password error',
      usernameError: 'Email error',
    });

    await wrapper.findAll('input').at(0).trigger('keyup');
    await wrapper.findAll('input').at(1).trigger('keyup');
    await wrapper.findAll('input').at(2).trigger('keyup');

    expect(wrapper.findAll('.v-messages').length).toEqual(3);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('');
    expect(wrapper.findAll('.v-messages').at(2).text()).toEqual('');
  });

  it('Does not dispatch data when a failed HTTP post occurs', () => {
    wrapper.findAll('.v-btn').at(1).trigger('click');

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  }); */
});
