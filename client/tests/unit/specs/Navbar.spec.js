import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Navbar from '@/components/layout/Navbar.vue';

const localVue = createLocalVue();
let vuetify;
let wrapper;

vuetify = new Vuetify();

describe('Implementation test for Navbar.vue - unauthorized user', () => {
  const mockStoreUnauth = {
    dispatch: jest.fn(),
    getters: {
      isAuthorized: false,
    },
  };

  beforeEach(() => {
    wrapper = mount(Navbar, {
      localVue,
      mocks: {
        $store: mockStoreUnauth,
      },
      stubs: [
        'router-link',
        'router-view',
      ],
      vuetify,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Initializes with correct elements', () => {
    expect(wrapper.findAll('.v-tab').length).toEqual(3);
    expect(wrapper.findAll('.v-tab').at(0).text()).toMatch('home');
    expect(wrapper.findAll('.v-tab').at(1).text()).toMatch('about');
    expect(wrapper.findAll('.v-tab').at(2).text()).toMatch('gemverse');

    // Check that mobile menu is rendered
    expect(wrapper.findAll('button').length).toEqual(1);
    expect(wrapper.findAll('button').at(0).text()).toMatch('menu');
  });

  it('Should call dispatch method when created', () => {
    // Check if any action were dispatched
    expect(mockStoreUnauth.dispatch).toHaveBeenCalled();

    // Check if one action was dispatched
    expect(mockStoreUnauth.dispatch).toHaveReturnedTimes(1);
  });

  it('Dispatch correct auth state when created', () => {
    expect(mockStoreUnauth.dispatch).toHaveBeenCalledWith(
      'remitAuthState',
      false,
    );
  });
});

describe('Implementation test for Navbar.vue - authorized user', () => {
  const localGetItem = jest.spyOn(window.localStorage.__proto__, 'setItem');
  const mockStoreAuth = {
    dispatch: jest.fn(),
    getters: {
      isAuthorized: true,
    },
  };

  beforeEach(() => {
    localStorage.setItem('authenticationToken', 'testToken');

    wrapper = mount(Navbar, {
      localVue,
      mocks: {
        $store: mockStoreAuth,
      },
      stubs: [
        'router-link',
        'router-view',
      ],
      vuetify,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localGetItem.mockClear();
    wrapper.destroy();
  });

  it('Initializes with correct elements', () => {
    // Check tabs initial state
    expect(wrapper.findAll('.v-tab').length).toEqual(6);
    expect(wrapper.findAll('.v-tab').at(0).text()).toMatch('home');
    expect(wrapper.findAll('.v-tab').at(1).text()).toMatch('rooms');
    expect(wrapper.findAll('.v-tab').at(2).text()).toMatch('profile');
    expect(wrapper.findAll('.v-tab').at(3).text()).toMatch('about');
    expect(wrapper.findAll('.v-tab').at(4).text()).toMatch('gemverse');
    expect(wrapper.findAll('.v-tab').at(5).text()).toMatch('logout');

    // Check that mobile menu is rendered
    expect(wrapper.findAll('button').length).toEqual(1);
    expect(wrapper.findAll('button').at(0).text()).toMatch('menu');
  });

  it('Should call dispatch method when created', () => {
    // Check if any action were dispatched
    expect(mockStoreAuth.dispatch).toHaveBeenCalled();

    // Check if one action was dispatched
    expect(mockStoreAuth.dispatch).toHaveReturnedTimes(1);
  });

  it('Dispatch correct auth state when created', () => {
    expect(mockStoreAuth.dispatch).toHaveBeenCalledWith(
      'remitAuthState',
      true,
    );
  });
});
