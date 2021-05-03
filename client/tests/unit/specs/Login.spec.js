import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Vue from 'vue'
import Vuetify from 'vuetify';
import Login from '@/components/authentication/Login.vue';

jest.mock('axios');

describe('Implementation test for Login.vue', () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;

  beforeEach(() => {
    const mock = new MockAdapter(axios);
    vuetify = new Vuetify();

    wrapper = mount(Login, {
      localVue,
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
    wrapper.destroy();
    mock.restore();
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

    // Check that the validation passed
    expect(wrapper.vm.isFormValid).toBeTruthy();
  });

  it('Enables auth alert when authentication failed', async () => {
    await wrapper.setData({
      redirectError: 'Access denied',
    });

    await Vue.nextTick();

    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('errorAlert');
  });

  it('Should authorise and then dispatch user data', async () => {
    const response = {
      auth:	true,
      data: {
        _id:	"testId",
        username: "testUser",
        email: "TestMail",
        password: "hashPass",
        createdDate: "testDate",
        __v: 0,
      },
      success: true,
      token: "testToken",
    };

    /* mock.onPost('http://localhost:3000/api/authentication/login').reply(200, { data: response});
    return store.dispatch('saveUser')
        .then(() => expect(store.state.user).toHaveLength(1)); */

    // axios.post.mockResolvedValue(response);
  });
});
