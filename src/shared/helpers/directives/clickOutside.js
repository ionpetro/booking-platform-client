import Vue from 'vue';

export default function clickOutsideDirective() {
  Vue.directive('click-outside', {
    bind: (el, binding, vnode) => {
      const customEl = el;
      customEl.clickOutsideEvent = event => {
        // here I check that click was outside the el and his children
        if (!(el === event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          const vnodeCustom = vnode;
          vnodeCustom.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unbind: el => {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    }
  });
}
