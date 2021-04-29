import { shallowMount } from '@vue/test-utils';
import Login from '@/components/authentication/Login.vue';

describe('Login.vue', () => {
  it('Test - development', () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.text()).toMatch('Welcome');
  });
});
