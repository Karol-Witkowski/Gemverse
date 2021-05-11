import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Profile from '@/components/profile/Profile.vue';

const localVue = createLocalVue();
const mockRouter = {
  push: jest.fn(),
};
let vuetify;
let wrapper;

jest.spyOn(window.localStorage.__proto__, 'clear');
vuetify = new Vuetify();

describe('Implementation test for Profile.vue', () => {
  const mockStore = {
    dispatch: jest.fn(),
    getters: {
      getUserInfo: {
        createdDate: '2021-04-20T01:01:22.269Z',
        email: 'test@mail.js',
        _id: '321testid',
        username: 'testUser',
      },
    },
  };

  beforeEach(() => {
    wrapper = mount(Profile, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      stubs: [
        'router-link',
        'router-view',
      ],
      vuetify,
      data() {
        return {
          deleteError: '',
          deleteRoomModal: false,
          deleteUserModal: false,
          errors: [],
        };
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  /* it('Initializes with correct elements', () => {
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
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if one action was dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(1);
  });

  it('Dispatch correct auth state when created', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(
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

const mockStore = {
  dispatch: jest.fn(),
  getters: {
    isAuthorized: true,
  },
};

describe('Behavioral test for Profile.vue - authorized user', () => {
  beforeEach(() => {
    localStorage.setItem('authenticationToken', 'testToken');

    wrapper = mount(Profile, {
      localVue,
      mocks: {
        $router: mockRouter,
        $store: mockStore,
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
    expect(mockStore.dispatch).toHaveBeenCalled();

    // Check if two actions were dispatched
    expect(mockStore.dispatch).toHaveReturnedTimes(3);

    // Check auth state was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      1,
      'remitAuthState',
      true,
    );

    // Check user data was dispatched with correct data
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
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
    expect(mockRouter.push).toHaveBeenCalledTimes(1)

    // Check if router push was called with correct object
    expect(mockRouter.push).toHaveBeenCalledWith({
      "name": "Login"
    });
  }); */
});
