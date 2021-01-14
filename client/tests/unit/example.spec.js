import { shallowMount } from '@vue/test-utils';
import Chat from '@/components/chat/Chat.vue';

describe('Chat.vue', () => {
  it('Jest test', () => {
    const wrapper = shallowMount(Chat);
    expect(wrapper.text()).toMatch('There will be a chatbox soon...');
  });
});
