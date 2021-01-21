import { shallowMount } from '@vue/test-utils';
import Room from '@/components/room/Room.vue';

describe('Room.vue', () => {
  it('Test - development', () => {
    const wrapper = shallowMount(Room);
    expect(wrapper.text()).toMatch('Welcome');
  });
});
