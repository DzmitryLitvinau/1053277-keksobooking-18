'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var AdFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var adressInput = document.querySelector('#address');
  window.adressInput = adressInput;
  var mainPin = document.querySelector('.map__pin--main');

  var disableElements = function (elements) {
    Array.from(elements).forEach(function (element) {
      window.util.setAttributes(element, {
        'disabled': 'disabled',
      });
    });
  };

  var enableElements = function (elements) {
    Array.from(elements).forEach(function (element) {
      element.removeAttribute('disabled');
    });
    window.util.setAttributes(window.adressInput, {
      'readonly': 'readonly',
    });
  };

  window.activeMode = {
    getActiveMode: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapFilters.classList.remove('map__filters--disabled');
      enableElements(AdFormFieldsets);
      enableElements(mapFilters.children);
    },

    getDisableMode: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      mapFilters.classList.add('map__filters--disabled');
      disableElements(mapFilters.children);
      disableElements(AdFormFieldsets);
      adForm.reset();
      mainPin.focus();
    },
  };

  window.activeMode.getDisableMode();
  mainPin.addEventListener('keydown', window.map.onMainPinEnterPress, true);

})();
