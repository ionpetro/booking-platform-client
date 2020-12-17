import {mount} from '@vue/test-utils';
import UnitCard from '../UnitCard.vue';

describe('UnitCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(UnitCard, {
      propsData: {
        unit: {
          id: 1,
          image: 'image',
          crater: 'name',
          distance: 1,
          facilities: {
            capsules: 1,
            sterilizers: 1,
            size: 1
          },
          price: 1,
          address: 1,
          discount: true
        }
      }
    });
  });

  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
