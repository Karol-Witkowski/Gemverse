import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ChatMessages from '@/components/chat/ChatMessages.vue';

const localVue = createLocalVue();
let vuetify;
let wrapper;

vuetify = new Vuetify();

describe('Implementation test for ChatMessages.vue', () => {
  beforeEach(() => {
    wrapper = mount(ChatMessages, {
      localVue,
      mocks: {
        $store: {
          getters: {
            getCurrentRoom: {
              _id: '123testid',
              slug: 'room-name',
            },
          },
        },
      },
      vuetify,
      propsData: {
        messages: {},
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  /* it('Initializes with correct elements', () => {
    // Test buttons initial state
    expect(wrapper.findAll('button').length).toEqual(2);
    expect(wrapper.findAll('button').at(0).text()).toMatch('cancel');
    expect(wrapper.findAll('button').at(1).text()).toMatch('send');

    // Test input initial state
    expect(wrapper.findAll('.v-text-field').length).toEqual(1);
    expect(wrapper.findAll('input').at(0).text()).toEqual('');

    // Test validation initial state
    expect(wrapper.findAll('.v-messages').length).toEqual(1);
    expect(wrapper.findAll('.v-messages').at(0).text()).toEqual('');
    expect(wrapper.vm.isformValid).toBeFalsy();
  }); */
});
