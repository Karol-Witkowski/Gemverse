import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Home from '@/views/Home.vue';

const localVue = createLocalVue();
let vuetify;
let wrapper;

vuetify = new Vuetify();

describe('Implementation test for Home.vue - - unauthorised', () => {
  beforeEach(() => {
    wrapper = mount(Home, {
      localVue,
      mocks: {
        $store: {
          getters: {
            isAuthorized: false,
          },
        },
      },
      vuetify,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Initializes with correct elements', () => {
    expect(wrapper.findAll('.v-btn').length).toEqual(2);
    expect(wrapper.findAll('.v-btn').at(0).text()).toMatch('sign in');
    expect(wrapper.findAll('.v-btn').at(1).text()).toMatch('sign up');
  });
});

describe('Implementation test for Home.vue - authorised', () => {
  beforeEach(() => {
    wrapper = mount(Home, {
      localVue,
      mocks: {
        $store: {
          getters: {
            isAuthorized: true,
          },
        },
      vuetify,
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Initializes with correct elements', () => {
    expect(wrapper.findAll('.v-btn').length).toEqual(1);
    expect(wrapper.findAll('.v-btn').at(0).text()).toMatch('room list');
  });
});
