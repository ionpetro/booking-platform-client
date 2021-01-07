import {shallowMount} from '@vue/test-utils';
import flushPromises from 'flush-promises';
import UnitList from '../UnitList.vue';
import UnitService from '../unit.service';
import UnitMock from '../unitDetails/__tests__/mocks/unit.mock';

jest.mock('../unit.service', () => jest.fn());

const mockData = [UnitMock];
const mockResp = {units: mockData, totalPages: 4, itemsCount: 48};

describe('UnitList', () => {
  let wrapper;

  beforeEach(() => {
    UnitService.mockClear();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('when loaded', () => {
    it('renders correctly', () => {
      wrapper = shallowMount(UnitList);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when component is mounted', () => {
    it('fetches data correctly', async () => {
      UnitService.prototype.getUnits = jest.fn(() => Promise.resolve(mockResp));

      wrapper = shallowMount(UnitList);

      await flushPromises();

      expect(wrapper.vm.$data.totalPages).toEqual(4);
      expect(wrapper.vm.$data.units).toEqual(mockData);
      expect(wrapper.vm.$data.loading).toBeFalsy();
      expect(wrapper.vm.$data.message).toEqual('');
    });

    it('handles fetch data error', async () => {
      UnitService.prototype.getUnits = jest.fn(() => Promise.reject(new Error('error')));

      wrapper = shallowMount(UnitList);

      await flushPromises();

      expect(wrapper.vm.$data.message).toEqual('error');
      expect(wrapper.vm.$data.totalPages).toEqual(1);
      expect(wrapper.vm.$data.units).toEqual([]);
      expect(wrapper.vm.$data.loading).toBeFalsy();
    });
  });
});
