import Vue from 'vue'
import drapDropService from './service'

Vue.directive('drop', {
    bind: function(el, binding, vnode, oldV) {
        let className = binding.value.className;
        let dropTagList = binding.value.dropTagList;
        
        el.addEventListener('dragenter',  function(event) {
          event.stopPropagation();
          event.preventDefault();
          if(el === event.target) {
            el.classList.add(className);
          }
        });
        el.addEventListener('dragover',  function(event) {
          event.stopPropagation();
          event.preventDefault();
        });
        el.addEventListener('dragleave',  function(event) {
          event.stopPropagation();
          event.preventDefault();
          if(el === event.target) {
            el.classList.remove(className);
          }
        });
        el.addEventListener('drop',  function(event) {
          event.stopPropagation();
          event.preventDefault();
          if(el === event.target) {
            el.classList.remove(className);
            let dragInfo = drapDropService.getDrapInfo();
            vnode.componentInstance.$emit('drop-result', {event:event.target, dragInfo: dragInfo});
            drapDropService.clearInfo();
          }
        });
    }
  });