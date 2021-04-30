import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Login from '@/components/authentication/Login.vue';

jest.mock('axios');

describe('CustomCard.vue', () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();

    wrapper = mount(Login, {
      localVue,
      stubs: ['router-link', 'router-view'],
      vuetify,
      propsData: {
        message: '',
      },
    });
  });

  it('should have a custom title and match snapshot', () => {
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear');
  });
});
