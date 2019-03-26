
import Vue from 'vue'

Vue.filter('timeFormat', function (date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    return y + '-' + m + '-' + d;
  })