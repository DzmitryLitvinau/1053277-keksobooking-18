'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var adressInput = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  window.adressInput = adressInput;
  var disableElements = function (element) {
    for (var j = 0; j < element.length; j++) {
      element[j].setAttribute('disabled', 'disabled');
    }

  };
  var enableElements = function (element) {
    for (var k = element.length - 1; k >= 0; k--) {
      element[k].removeAttribute('disabled');
    }
    adressInput.setAttribute('disabled', 'disabled');
  };

  var getActiveMode = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    enableElements(fieldsetsAdForm);
    enableElements(mapFilters.children);
  };

  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  disableElements(mapFilters.children);
  disableElements(fieldsetsAdForm);
  mainPin.addEventListener('mousedown', getActiveMode);
  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, getActiveMode);
  });
})();
