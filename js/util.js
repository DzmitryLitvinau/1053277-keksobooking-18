'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  window.util = {
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNumber;
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    setAttributes: function (el, attrs) {
      for (var key in attrs) {
        if (key) {
          el.setAttribute(key, attrs[key]);
        }
      }
    },
  };
})();
