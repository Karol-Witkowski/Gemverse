import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Navbar from '@/components/layout/Navbar.vue';

const localGetItem = jest.spyOn(window.localStorage.__proto__, 'getItem');
const localVue = createLocalVue();
const mockStore = { dispatch: jest.fn() };
let vuetify;
let wrapper;

vuetify = new Vuetify();

describe('Implementation test for Navbar.vue', () => {
  beforeEach(() => {
    wrapper = mount(Navbar, {
      localVue,
      mocks: {
        $store: mockStore,
        getters: {
          isAuthorized: true,
        },
      },
      stubs: [
        'router-link',
        'router-view',
      ],
      vuetify,
    });
  });

  afterEach(() => {
    localGetItem.mockClear();
    wrapper.destroy();
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Initializes with correct elements', () => {
    // Test buttons initial state
    expect(wrapper.findAll('button').length).toEqual(2);
    /// expect(wrapper.findAll('button').at(0).text()).toMatch('cancel');
    // expect(wrapper.findAll('button').at(1).text()).toMatch('send');
  });
});
