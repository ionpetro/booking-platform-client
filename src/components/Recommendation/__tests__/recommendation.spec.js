import {mount} from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Recommendation from '../Recommendation.vue';

describe('Recommendation', () => {
  let wrapper;
  const $router = {push: jest.fn()};

  beforeEach(() => {
    wrapper = mount(Recommendation, {
      mocks: {$router}
    });
    // mount component and login a user
    wrapper.setData({loading: false});
  });

  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
    it('redirects to perfect unit', async () => {
      await wrapper.find('.recommendation__unit__desc__button').trigger('click');

      await flushPromises();
      expect($router.push).toHaveBeenCalledWith({name: 'units', params: {id: 3}});
    });
  });
});
