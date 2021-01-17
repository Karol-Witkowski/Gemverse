import { shallowMount } from '@vue/test-utils';
import ChatBox from '@/components/ChatBox.vue';

describe('Chatbox.vue', () => {
  it('Test - development', () => {
    const wrapper = shallowMount(ChatBox);
    expect(wrapper.text()).toMatch('Welcome');
  });
});
