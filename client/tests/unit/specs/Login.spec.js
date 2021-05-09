import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Login from '@/components/authentication/Login.vue';
import tokenSetter from '@/utils/authTokenSetter';

const mockStore = { dispatch: jest.fn() };
const localSetItem = jest.spyOn(window.localStorage.__proto__, 'setItem');
const localVue = createLocalVue();
const url = 'http://localhost:3000/api/authentication/login';
let vuetify;
let wrapper;
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
vuetify = new Vuetify();

describe('Implementation test for Login.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    wrapper = mount(Login, {
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
          redirectError: this.message,
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

  it('Initializes with correct elements', () => {
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

    // Check that the login button is active
    expect(wrapper.findAll('.v-btn').at(2).element.disabled).toBeFalsy();
  });

  it('Fail validation when one field is empty', async () => {
    await wrapper.setData({
      email: 'email value',
    });

    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it('Enables dismissible auth alert when authentication failed', async () => {
    await wrapper.setData({
      redirectError: 'Access denied',
    });

    // Chek that aut alert is visible
    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('errorAlert');

    await wrapper.vm.hideRedirectError();

    // Chek that auth alert is hidden
    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('whiteSpace');
  });

  it('Should sends post request with correct on form submit', async () => {
    await wrapper.setData({
      email: 'email value',
      password: 'password value',
    });

    await wrapper.vm.login();

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

  it('Should store user data and auth status after successful login', async () => {
    wrapper.vm.login();

    // Check if any action were dispatched
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if two actions were dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(2);

    // Check auth state was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      1, 'remitAuthState', true,
    );

    // Check user data was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      2, 'saveUser', response.data.data,
    );
  });

  it('Should store token on successful login', async () => {
    wrapper.vm.login();

    await tokenSetter('token', true);

    expect(localSetItem).toHaveBeenCalled();
    expect(localSetItem).toHaveBeenNthCalledWith(
      1, 'authenticationToken', 'testToken',
    );
  });
});

describe('Implementation test for Login.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);

    wrapper = mount(Login, {
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
    localSetItem.mockClear();
    mockStore.dispatch.mockReset();
    wrapper.destroy();
  });

  it('Display error messages on HTTP post failure', async () => {
    await wrapper.vm.login();

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(2);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Email error');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Password error');
  });

  it('Does not dispatch data on failed HTTP post', () => {
    wrapper.vm.login();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('Does not set token when a failed HTTP post occurs', () => {
    wrapper.findAll('.v-btn').at(2).trigger('click');

    expect(localSetItem).not.toHaveBeenCalled();
  });
});

describe('Behavioral test for Login.vue - successful HTTP post', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    wrapper = mount(Login, {
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
          redirectError: this.message,
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

  it('Dissmiss auth error on click', async () => {
    await wrapper.setData({
      redirectError: 'Access denied',
    });

    // Chek that auth alert is visible
    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('errorAlert');

    await wrapper.findAll('.v-btn').at(0).trigger('click');

    // Chek that aut alert is hidden after click
    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('whiteSpace');
  });

  it('Should not sends post request when inputs are empty', async () => {
    wrapper.findAll('.v-btn').at(2).trigger('click');

    expect(axios.post).not.toHaveBeenCalled();
  });

  it('Should sends post request with correct data on form submit', async () => {
    await wrapper.findAll('input').at(0).setValue('email value');
    await wrapper.findAll('input').at(1).setValue('password value');

    await Vue.nextTick();

    wrapper.findAll('.v-btn').at(2).trigger('click');

    // Check if sing in button was clicked
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

  it('Should store user data and auth status after successful login', () => {
    wrapper.findAll('.v-btn').at(2).trigger('click');

    // Check if any action were dispatched
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if two actions were dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(2);

    // Check auth state was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      1, 'remitAuthState', true,
    );

    // Check user data was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      2, 'saveUser', response.data.data,
    );
  });

  it('Should store token on successful login', async () => {
    wrapper.findAll('.v-btn').at(2).trigger('click');

    await tokenSetter('token', true);

    expect(localSetItem).toHaveBeenCalled();
    expect(localSetItem).toHaveBeenNthCalledWith(
      1, 'authenticationToken', 'testToken',
    );
  });
});

describe('Behavioral test for Login.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);

    wrapper = mount(Login, {
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
    localSetItem.mockClear();
    mockStore.dispatch.mockReset();
    wrapper.destroy();
  });

  it('Display error messages on HTTP post failure', async () => {
    await wrapper.findAll('input').at(0).setValue('email value');
    await wrapper.findAll('input').at(1).setValue('password value');

    await Vue.nextTick();

    await wrapper.findAll('.v-btn').at(2).trigger('click');

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(2);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Email error');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Password error');
  });

  it('Hide HTTP post error messages when user enter new data', async () => {
    await wrapper.setData({
      passwordError: 'Password error',
      userError: 'Email error',
    });

    await wrapper.findAll('input').trigger('keyup');

    expect(wrapper.findAll('.v-messages').length).toEqual(2);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('');
  });

  it('Does not dispatch data when a failed HTTP post occurs', () => {
    wrapper.findAll('.v-btn').at(2).trigger('click');

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('Does not set token when a failed HTTP post occurs', () => {
    wrapper.findAll('.v-btn').at(2).trigger('click');

    expect(localSetItem).not.toHaveBeenCalled();
  });
});
