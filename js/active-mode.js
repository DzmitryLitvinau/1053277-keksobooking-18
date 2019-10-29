'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var adressInput = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');


  window.adressInput = adressInput;
  window.activeMode = {
    disableElements: function (element) {
      Array.from(element).forEach(function (select) {
        select.setAttribute('disabled', 'disabled');
      });
    },

    enableElements: function (element) {
      Array.from(element).forEach(function (select) {
        select.removeAttribute('disabled');
      });
      adressInput.setAttribute('readonly', 'readonly');
    },

    getActiveMode: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapFilters.classList.remove('map__filters--disabled');
      window.activeMode.enableElements(fieldsetsAdForm);
      window.activeMode.enableElements(mapFilters.children);
      window.load(window.map.successHandler, window.map.errorHandler);

    },

    getDisableMode: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      mapFilters.classList.add('map__filters--disabled');
      window.activeMode.disableElements(mapFilters.children);
      window.activeMode.disableElements(fieldsetsAdForm);
      adForm.reset();
      mainPin.focus();
    },
  };

  window.activeMode.getDisableMode();
  // window.load(window.map.successHandler, window.map.errorHandler);
  /* var onMainPinEnterPress = function (evt) {
    window.util.isEnterEvent(evt, window.activeMode.getActiveMode);
  }; */
  /* mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.activeMode.getActiveMode);
  }); */
  // не работает хотя код выше работает.

  mainPin.addEventListener('keydown', window.map.onMainPinEnterPress, true);

})();
