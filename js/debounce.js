'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
