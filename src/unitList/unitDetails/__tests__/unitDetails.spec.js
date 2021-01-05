import flushPromises from 'flush-promises';
import {shallowMount} from '@vue/test-utils';
import unitMock from './mocks/unit.mock';
import UnitDetails from '../UnitDetails.vue';
import UnitService from '../../unit.service';

jest.mock('../../unit.service', () => jest.fn());
const mockResp = unitMock;
describe('UnitDetails', () => {
  let wrapper;

  beforeEach(() => {
    UnitService.mockClear();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('when loaded', () => {
    it('renders data correctly', async () => {
      UnitService.prototype.getUnitById = jest.fn(() => Promise.resolve(mockResp));
      wrapper = shallowMount(UnitDetails, {
        propsData: {
          selectedUnitId: 1
        }
      });

      await flushPromises();
      expect(wrapper.vm.$data.unit).toEqual(unitMock);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('handles fetch data error', async () => {
      UnitService.prototype.getUnitById = jest.fn(() => Promise.reject(new Error('error')));
      wrapper = shallowMount(UnitDetails, {
        propsData: {
          selectedUnitId: 1
        }
      });

      await flushPromises();
      expect(wrapper.vm.$data.message).toEqual('error');
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
