import {mount} from '@vue/test-utils';
import UnitBookDate from '../UnitBookDate.vue';
import mockUnit from '../../../__tests__/mocks/unit.mock';

describe('UnitBookDate', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(UnitBookDate, {
      propsData: {
        unit: mockUnit
      }
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

  describe('when input arrow is clicked', () => {
    it('opens modal', async () => {
      // click arrow button
      await wrapper.find('.testArrow').trigger('click');

      // expect the modal to be open
      expect(wrapper.vm.$data.show).toBeTruthy();
    });

    describe('when modal is open', () => {
      it('selectes year when it is clicked', async () => {
        // wrapper.vm.$data.show = true;
        await wrapper.find('.testArrow').trigger('click');

        // year 2080 is clicked (it is enabled)
        await wrapper
          .findAll('span')
          .at(2)
          .trigger('click');

        expect(wrapper.emitted().onSelectedYear[0]).toEqual(['2082']);
      });
      it('does nothing when disabled year is clicked', async () => {
        // wrapper.vm.$data.show = true;
        await wrapper.find('.testArrow').trigger('click');

        // year 2081 is clicked (it is disabled)
        await wrapper
          .findAll('span')
          .at(1)
          .trigger('click');

        expect(wrapper.emitted().onSelectedYear).toBeFalsy();
      });
    });
  });
});
