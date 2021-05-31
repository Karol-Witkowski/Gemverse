import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Home from '@/views/Home.vue';

const localVue = createLocalVue();
const vuetify = new Vuetify();
let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe('Implementation test for Home.vue - unauthorised', () => {
  beforeEach(() => {
    wrapper = mount(Home, {
      localVue,
      mocks: {
        $store: {
          getters: {
            isAuthorized: false,
          },
        },
        vuetify,
      },
    });
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Initializes with correct elements', () => {
    expect(wrapper.findAll('.v-btn').length).toEqual(2);
    expect(wrapper.find('[name=login]').text()).toMatch('sign in');
    expect(wrapper.find('[name=register]').text()).toMatch('sign up');
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
      },
    });
  });

  it('Initializes with correct elements', () => {
    expect(wrapper.findAll('.v-btn').length).toEqual(1);
    expect(wrapper.find('[name=list]').text()).toMatch('room list');
  });
});
