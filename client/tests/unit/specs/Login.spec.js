import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Login from '@/components/authentication/Login.vue';

const mockStore = { dispatch: jest.fn() };
const localVue = createLocalVue();
const url = 'http://localhost:3000/api/authentication/login';
let vuetify;
let wrapper;
let expectedData = expect.objectContaining({
  email: 'email value',
  password: 'password value',
});

jest.mock('axios');
vuetify = new Vuetify();

describe('Implementation test for Login.vue - successful HTTP post', () => {
  let response = {
    data: {
      auth:	true,
      data: {
        data: 'testData'
      },
      success: true,
      token: "testToken",
    },
  };

  beforeEach(() => {
    axios.post.mockResolvedValue(response);

    wrapper = mount(Login, {
      localVue,
      mocks: {
        $store: mockStore
      },
      stubs: ['router-link', 'router-view'],
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

  it('Enables log-in button when email address and password are entered', async () => {
    await wrapper.setData({
      email: 'email value',
      password: 'password value',
    });

    await Vue.nextTick();

    // Check that the user data is properly set
    expect(wrapper.findAll('input').at(0).element.value).toEqual('email value');
    expect(wrapper.findAll('input').at(1).element.value).toEqual('password value');
    expect(wrapper.vm.email).toBe('email value');
    expect(wrapper.vm.password).toBe('password value');

    // Check that the login button is active
    expect(wrapper.findAll('.v-btn').at(2).element.disabled).toBeFalsy();
  });

  it('Pass validation when email and password are entered', async () => {
    await wrapper.setData({
      email: 'email value',
      password: 'password value',
    });

    await Vue.nextTick();

    expect(wrapper.vm.isFormValid).toBeTruthy();
  });

  it('Fail validation when email and password are not entered', async () => {
    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it('Fail validation when one field is empty', async () => {
    await wrapper.setData({
      email: 'email value',
    });

    await Vue.nextTick();

    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it('Enables auth alert when authentication failed', async () => {
    await wrapper.setData({
      redirectError: 'Access denied',
    });

    await Vue.nextTick();

    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('errorAlert');
  });

  it('Should sends post request with correct on form submit', async () => {
    await wrapper.setData({
      email: 'email value',
      password: 'password value',
    });

    await Vue.nextTick();

    wrapper.vm.login();

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

  it('Should store user data and auth status after successful login', async () => {
    wrapper.vm.login();

    // Check if any action are dispatched
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if two actions are dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(2);

    // Check auth state is dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      1, 'remitAuthState', true
    );

    // Check user data is dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      2, 'saveUser', response.data.data,
    );
  });
});

describe('Implementation test for Login.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(new Error('BAD REQUEST'));

    wrapper = mount(Login, {
      localVue,
      mocks: {
        $store: mockStore
      },
      stubs: ['router-link', 'router-view'],
      vuetify,
      data() {
        return {
          email: '',
          isFormValid: false,
          password: '',
        };
      },
    });
  });

  afterEach(() => {
    axios.post.mockReset();
    mockStore.dispatch.mockReset();
    wrapper.destroy();
  });

  it('Call login function with correct data', async () => {
    await wrapper.setData({
      email: 'email value',
      password: 'password value',
    });

    await Vue.nextTick();

    wrapper.vm.login();

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toBeCalledWith(
      url,
      expectedData
    );
  });

  it('Does not dispatch data when a failed HTTP post occurs', () => {
    wrapper.vm.login();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
});
