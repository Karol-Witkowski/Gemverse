import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Navbar from '@/components/layout/Navbar.vue';

const localVue = createLocalVue();
const mockRouter = {
  push: jest.fn(),
};
const mockStoreAuthorized = {
  dispatch: jest.fn(),
  getters: {
    isAuthorized: true,
  },
};
const mockStoreUnauthorized = {
  dispatch: jest.fn(),
  getters: {
    isAuthorized: false,
  },
};
let vuetify;
let wrapper;

jest.spyOn(window.localStorage.__proto__, 'clear');
jest.spyOn(window.localStorage.__proto__, 'setItem');
vuetify = new Vuetify();

describe('Implementation test for Navbar.vue - unauthorized user', () => {
  beforeEach(() => {
    wrapper = mount(Navbar, {
      localVue,
      mocks: {
        $store: mockStoreUnauthorized,
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
    expect(mockStoreUnauthorized.dispatch).toHaveBeenCalled();

    // Check if one action was dispatched
    expect(mockStoreUnauthorized.dispatch).toHaveReturnedTimes(1);
  });

  it('Dispatch correct auth state when created', () => {
    expect(mockStoreUnauthorized.dispatch).toHaveBeenCalledWith(
      'remitAuthState',
      false,
    );
  });

  it('Should call store clear method when created', () => {
    // Check if local storage clear method was called
    expect(localStorage.clear).toHaveBeenCalled();

    // Check if local storage clear method was called once
    expect(localStorage.clear).toHaveReturnedTimes(1);
  });
});

describe('Implementation test for Navbar.vue - authorized user', () => {
  beforeEach(() => {
    localStorage.setItem('authenticationToken', 'testToken');

    wrapper = mount(Navbar, {
      localVue,
      mocks: {
        $router: mockRouter,
        $store: mockStoreAuthorized,
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
    expect(mockStoreAuthorized.dispatch).toHaveBeenCalled();

    // Check if one action was dispatched
    expect(mockStoreAuthorized.dispatch).toHaveReturnedTimes(1);
  });

  it('Dispatch correct auth state when created', () => {
    expect(mockStoreAuthorized.dispatch).toHaveBeenCalledWith(
      'remitAuthState',
      true,
    );
  });

  it('Dispatch correct data on logout', () => {
    wrapper.vm.logout();

    // Check if any action were dispatched
    expect(mockStoreAuthorized.dispatch).toHaveBeenCalled();

    // Check if two actions were dispatched
    expect(mockStoreAuthorized.dispatch).toHaveReturnedTimes(3);

    // Check auth state was dispatched with correct data
    expect(mockStoreAuthorized.dispatch).toHaveBeenNthCalledWith(
      1,
      'remitAuthState',
      true,
    );

    // Check user data was dispatched with correct data
    expect(mockStoreAuthorized.dispatch).toHaveBeenNthCalledWith(
      3,
      'saveUser',
      '',
    );
  });

  it('Add auth state to storage object', () => {
    wrapper.vm.logout();

    // Check if local storage setter was called
    expect(localStorage.setItem).toHaveBeenCalled();

    // Check if local storage setter was called once
    expect(localStorage.setItem).toHaveReturnedTimes(1);

    // Check if local storage setter was called with correct data
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'authenticationToken',
      'testToken',
    );
  });

  it('Clear local storage on logout', () => {
    wrapper.vm.logout();

    // Check if local storage clear method was called
    expect(localStorage.clear).toHaveBeenCalled();

    // Check if local storage clear method was called once
    expect(localStorage.clear).toHaveReturnedTimes(1);
  });

  it('Redirect user to login page on logout', () => {
    wrapper.vm.logout();

    // Check if router push was called
    expect(mockRouter.push).toHaveBeenCalled();

    // Check if router push was called one time
    expect(mockRouter.push).toHaveBeenCalledTimes(1);

    // Check if router push was called with correct object
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'Login',
    });
  });
});

describe('Behavioral test for Navbar.vue - authorized user', () => {
  beforeEach(() => {
    localStorage.setItem('authenticationToken', 'testToken');

    wrapper = mount(Navbar, {
      localVue,
      mocks: {
        $router: mockRouter,
        $store: mockStoreAuthorized,
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

  it('Dispatch correct data on logout', () => {
    wrapper.findAll('.v-tab').at(5).trigger('click');

    // Check if any action were dispatched
    expect(mockStoreAuthorized.dispatch).toHaveBeenCalled();

    // Check if two actions were dispatched
    expect(mockStoreAuthorized.dispatch).toHaveReturnedTimes(3);

    // Check auth state was dispatched with correct data
    expect(mockStoreAuthorized.dispatch).toHaveBeenNthCalledWith(
      1,
      'remitAuthState',
      true,
    );

    // Check user data was dispatched with correct data
    expect(mockStoreAuthorized.dispatch).toHaveBeenNthCalledWith(
      3,
      'saveUser',
      '',
    );
  });

  it('Add auth state to storage object', () => {
    wrapper.findAll('.v-tab').at(5).trigger('click');

    // Check if local storage setter was called
    expect(localStorage.setItem).toHaveBeenCalled();

    // Check if local storage setter was called once
    expect(localStorage.setItem).toHaveReturnedTimes(1);

    // Check if local storage setter was called with correct data
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'authenticationToken',
      'testToken',
    );
  });

  it('Clear local storage on logout', () => {
    wrapper.findAll('.v-tab').at(5).trigger('click');

    // Check if local storage clear method was called
    expect(localStorage.clear).toHaveBeenCalled();

    // Check if local storage clear method was called once
    expect(localStorage.clear).toHaveReturnedTimes(1);
  });

  it('Redirect user to login page on logout', () => {
    wrapper.findAll('.v-tab').at(5).trigger('click');

    // Check if router push was called
    expect(mockRouter.push).toHaveBeenCalled();

    // Check if router push was called one time
    expect(mockRouter.push).toHaveBeenCalledTimes(1);

    // Check if router push was called with correct object
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'Login',
    });
  });
});
