import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Login from '@/components/authentication/Login.vue';

jest.mock('axios');

describe('Implementation test for Login.vue', () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;

  beforeEach(() => {
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
          passwordError: '',
          redirectError: this.message,
          userError: '',
          generalRules: [
            (value) => !!value || 'Required',
          ],
        };
      },
      propsData: {
        message: '',
      },
    });
  });

  it('Initializes with correct elements', () => {
    // Test buttons initial state
    expect(wrapper.findAll('.v-btn').length).toEqual(4);
    expect(wrapper.findAll('.v-btn').at(0).text()).toMatch('ok');
    expect(wrapper.findAll('.v-btn').at(1).text()).toMatch('back');
    expect(wrapper.findAll('.v-btn').at(2).text()).toMatch('sign in');
    expect(wrapper.findAll('.v-btn').at(3).text()).toMatch('sign up');
    expect(wrapper.findAll('.v-btn').at(2).attributes().disabled).toBe('disabled');

    // Test auth alert initial state
    expect(wrapper.findAll('.v-alert').at(0).attributes().class).toContain('whiteSpace');

    // Test inputs initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(2);
    expect(wrapper.findAll('.v-text-field').at(0).text()).toEqual('E-mail adress');
    expect(wrapper.findAll('.v-text-field').at(1).text()).toEqual('Password');
    expect(wrapper.findAll('.v-text-field').at(1).text()).toEqual('Password');

    // Test validation initial state
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
    expect(wrapper.findAll('.v-messages').at(1).text()).toEqual('');
  });
});
