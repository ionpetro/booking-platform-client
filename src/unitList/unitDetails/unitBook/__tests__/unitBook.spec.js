import {mount} from '@vue/test-utils';
import UnitBook from '../UnitBook.vue';
import unitMock from '../../__tests__/mocks/unit.mock';

describe('UnitBook', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(UnitBook, {
      propsData: {unit: unitMock}
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('when loaded', () => {
    it('renders data correctly', async () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
