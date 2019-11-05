'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var mapPinMain = mapPin.querySelector('.map__pin--main');
  var PINS_LIMIT = 5;

  var openAdvertPopup = function (selected) {
    selected.classList.add('map__pin--active');
    if (selected.previousElementSibling) {
      selected.previousElementSibling.classList.remove('hidden');
    }
  };

  var hideAdverts = function () {
    var mapCards = mapPin.querySelectorAll('.map__card');
    Array.from(mapCards).forEach(function (element) {
      element.classList.add('hidden');
    });
  };

  var closeAdvertPopup = function (evt) {
    evt.parentElement.classList.add('hidden');
  };

  var onAdvertPopupEscPress = function (event) {
    window.util.isEscEvent(event, hideAdverts);
  };

  var onClickAdvertPopupClose = function () {
    mapPin.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.className === 'popup__close') {
        closeAdvertPopup(target);
      }
    });
  };

  window.render = function (advert) {
    var takeNumber = advert.length > PINS_LIMIT ? PINS_LIMIT : advert.length;
    mapPin.innerHTML = '';
    mapPin.appendChild(mapPinMain);
    mapPinMain.addEventListener('mousedown', window.pin.onMouseDown);
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(window.card.renderAdvert(advert[i]));
      fragment.appendChild(window.pin.renderPin(advert[i]));
    }
    mapPin.appendChild(fragment);
    hideAdverts();
    var smallMapPins = mapPin.querySelectorAll('.map__pin');
    Array.from(smallMapPins).forEach(function (element) {
      element.addEventListener('click', window.map.onClickSmallPin);
    });
    onClickAdvertPopupClose();
  };

  window.map = {
    successHandler: function (data) {
      window.render(data);
      window.filter.adverts = data;
      window.filter.mapFilters.addEventListener('change', window.filter.onFilterChange);
    },

    onMainPinEnterPress: function (evt) {
      window.util.isEnterEvent(evt, window.activeMode.getActiveMode);
    },

    onClickSmallPin: function (evt) {
      var smallMapPin = evt.target.closest('.map__pin');
      var smallMapPins = mapPin.querySelectorAll('.map__pin');
      Array.from(smallMapPins).forEach(function (element) {
        element.classList.remove('map__pin--active');
      });
      hideAdverts();
      if (smallMapPin && (mapPinMain.className !== 'map__pin--main')) {
        openAdvertPopup(smallMapPin);
      }
      document.addEventListener('keydown', onAdvertPopupEscPress);
    },

    deletePinsAndAdverts: function () {
      var smallMapPins = mapPin.querySelectorAll('.map__pin');
      var mapCard = mapPin.querySelectorAll('.map__card');
      Array.from(smallMapPins).forEach(function (element) {
        if (element.className !== 'map__pin map__pin--main') {
          element.remove();
        }
      });
      Array.from(mapCard).forEach(function (element) {
        element.remove();
      });
    },
  };
})();
