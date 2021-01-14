import flushPromises from 'flush-promises';
import {shallowMount} from '@vue/test-utils';
import Button from '../../../../components/Button/Button.vue';
import UnitBook from '../UnitBook.vue';
import unitMock from '../../__tests__/mocks/unit.mock';
import UnitService from '../../../unit.service';

jest.mock('../../../unit.service', () => jest.fn());
const mockData = {
  bookId: 2,
  bookDate: '1/1/2020'
};
const mockResp = mockData;
describe('UnitBook', () => {
  const $router = {push: jest.fn()};
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(UnitBook, {
      propsData: {unit: unitMock},
      mocks: {$router}
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
  describe('when book button is clicked', () => {
    it('makes the booking', async () => {
      wrapper.vm.yearSelected(2081);
      UnitService.prototype.bookUnitById = jest.fn(() => Promise.resolve(mockResp));
      await wrapper.findComponent(Button).trigger('click');
      await flushPromises();
      expect($router.push).toHaveBeenCalledWith({name: 'bookRef', params: {id: 2}});
    });
    it('throws an error message if booking was failed', async () => {
      wrapper.vm.yearSelected(2081);
      const err = new Error('error');
      UnitService.prototype.bookUnitById = jest.fn(() => Promise.reject(err));
      await wrapper.findComponent(Button).trigger('click');
      await flushPromises();
      expect(UnitService.prototype.bookUnitById).toHaveBeenCalled();
      expect(wrapper.emitted().onErrorMessage[0]).toEqual([err]);
    });
  });
});
