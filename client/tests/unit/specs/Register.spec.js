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
let error = {
  response: {
    data: {
      password: 'Password error',
      user: 'Email error'
    },
  }
};
const expectedData = expect.objectContaining({
  email: 'email value',
  password: 'password value',
});
const response = {
  data: {
    auth:	true,
    data: {
      data: 'testData'
    },
    success: true,
    token: "testToken"
  }
};

jest.mock('axios');
vuetify = new Vuetify();

/* describe('Implementation test for Register.vue - successful HTTP post', () => {
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
          isFormValid: false,
          password: '',
          redirectError: this.message
        };
      },
      propsData: {
        message: ''
      }
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
      userError: 'Email error'
    });

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(2);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Email error');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Password error');
  });

  it('Enables log-in button when email address and password are set', async () => {
    await wrapper.setData({
      email: 'email value',
      password: 'password value'
    });

    await Vue.nextTick();

    // Check that the user data is properly set
    expect(wrapper.findAll('input').at(0).element.value).toEqual('email value');
    expect(wrapper.findAll('input').at(1).element.value).toEqual('password value');
    expect(wrapper.vm.email).toBe('email value');
    expect(wrapper.vm.password).toBe('password value');

    // Check if validation pass
    expect(wrapper.vm.isFormValid).toBeTruthy();

    // Check that the Register button is active
    expect(wrapper.findAll('.v-btn').at(2).element.disabled).toBeFalsy();
  });

  it('Fail validation when email and password are not entered', () => {
    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it('Fail validation when one field is empty', async () => {
    await wrapper.setData({
      email: 'email value'
    });

    await Vue.nextTick();

    expect(wrapper.vm.isFormValid).toBeFalsy();
  });

  it('Enables dismissible auth alert when authentication failed', async () => {
    await wrapper.setData({
      redirectError: 'Access denied'
    });

    // Chek that aut alert is visible
    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('errorAlert');

    wrapper.vm.hideRedirectError();

    await Vue.nextTick();

    // Chek that aut alert is hidden
    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('whiteSpace');
  });

  it('Should sends post request with correct on form submit', async () => {
    await wrapper.setData({
      email: 'email value',
      password: 'password value'
    });

    await Vue.nextTick();

    wrapper.vm.Register();

    // Check if post is called
    expect(axios.post).toHaveBeenCalled();

    // Check if post are called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if post is called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      url,
      expectedData
    );
  });

  it('Should store user data and auth status after successful Register', async () => {
    wrapper.vm.Register();

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
      2, 'saveUser', response.data.data
    );
  });
});

describe('Implementation test for Register.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);

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
          isFormValid: false,
          password: '',
          passwordError: '',
          userError: ''
        };
      }
    });
  });

  afterEach(() => {
    mockStore.dispatch.mockReset();
    wrapper.destroy();
  });

  it('Display error messages on HTTP post failure', async () => {
    await wrapper.vm.Register();

    await Vue.nextTick();

    expect(wrapper.findAll('.v-messages').length).toEqual(2);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('Email error');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('Password error');
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
        $store: mockStore
      },
      stubs: ['router-link', 'router-view'],
      vuetify,
      data() {
        return {
          email: '',
          isFormValid: false,
          password: '',
          redirectError: this.message
        };
      },
      propsData: {
        message: ''
      }
    });
  });

  afterEach(() => {
    axios.post.mockReset();
    wrapper.destroy();
  });

  it('Dissmiss auth error on click', async () => {
    await wrapper.setData({
      redirectError: 'Access denied'
    });

    // Chek that aut alert is visible
    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('errorAlert');

    wrapper.findAll('.v-btn').at(0).trigger('click');

    await Vue.nextTick();

    // Chek that aut alert is hidden after click
    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('whiteSpace');
  });

  it('Should not sends post request when inputs are empty', async () => {
    wrapper.findAll('.v-btn').at(2).trigger('click');

    expect(axios.post).not.toHaveBeenCalled();
  });

  it('Should sends post request with correct on form submit', async () => {
    await wrapper.findAll('input').at(0).setValue('email value');
    await wrapper.findAll('input').at(1).setValue('password value');

    await Vue.nextTick();

    wrapper.findAll('.v-btn').at(2).trigger('click');

    // Check if sing in button is clicked
    expect(axios.post).toHaveBeenCalled();

    // Check if post are called once
    expect(axios.post).toHaveReturnedTimes(1);

    // Check if post is called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      url,
      expectedData
    );
  });

  it('Should store user data and auth status after successful Register', () => {
    wrapper.findAll('.v-btn').at(2).trigger('click');

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
      2, 'saveUser', response.data.data
    );
  });
});

describe('Behavioral test for Register.vue - failed HTTP post', () => {
  beforeEach(() => {
    axios.post.mockRejectedValue(error);

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
          isFormValid: false,
          password: '',
          passwordError: '',
          userError: ''
        };
      }
    });
  });

  afterEach(() => {
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

  it('Does not dispatch data when a failed HTTP post occurs', () => {
    wrapper.findAll('.v-btn').at(2).trigger('click');

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
}); */
