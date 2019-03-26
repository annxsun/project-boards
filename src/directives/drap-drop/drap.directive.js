import Vue from 'vue'
import drapDropService from './service'

Vue.directive('drap', {
    bind: function(el, binding, vnode, oldV) {
        let className = binding.value.className;
        let data = binding.value.data;
        let drapTag = binding.value.drapTag;
        el.setAttribute('draggable', true);
        el.addEventListener('dragstart', function(event) {
          if(el === event.target) {
            el.classList.add(className);
            drapDropService.setData({data:data, drapTag: drapTag});
          }
        });
        el.addEventListener('dragend',  function(event) {
          if(el === event.target) {
            el.classList.remove(className);
          }
        });
    }
});