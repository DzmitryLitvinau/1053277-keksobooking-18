'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var housingRoomsSelect = document.querySelector('#room_number');
  var housingGuestsSelect = document.querySelector('#capacity');

  var PIN_ELEM_XSIZE = 40;
  var PIN_ELEM_YSIZE = 40;
  var MAIN_PIN_XSIZE = 64;
  var MAIN_PIN_YSIZE = 84;
  var MAIN_PIN_OVERLAY_X_START = 0;
  var MAIN_PIN_OVERLAY_X_END = 1200;
  var MAIN_PIN_OVERLAY_Y_START = 130;
  var MAIN_PIN_OVERLAY_Y_END = 630;

  var getPinCoord = function () {
    var leftCoord = Math.round(Number(mapPinMain.style.left.slice(0, -2)) + (window.pin.MAIN_PIN_XSIZE / 2));
    var topCoord;
    if (map.className === 'map map--faded') {
      topCoord = Number(mapPinMain.style.top.slice(0, -2));
    } else {
      topCoord = Number(mapPinMain.style.top.slice(0, -2)) + window.pin.MAIN_PIN_YSIZE;
    }
    var pinCoord = leftCoord + ', ' + topCoord;
    return pinCoord;
  };
  var mapPin = map.querySelector('.map__pins');
  var mapPinCoords = mapPin.getBoundingClientRect();
  var limits = {
    top: MAIN_PIN_OVERLAY_Y_START - MAIN_PIN_YSIZE,
    right: MAIN_PIN_OVERLAY_X_END - (MAIN_PIN_XSIZE / 2),
    bottom: MAIN_PIN_OVERLAY_Y_END - MAIN_PIN_YSIZE,
    left: MAIN_PIN_OVERLAY_X_START - (MAIN_PIN_XSIZE / 2),
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var startCoords = {
      x: moveEvt.pageX - mapPinCoords.left,
      y: moveEvt.pageY
    };

    if (startCoords.y < limits.top) {
      startCoords.y = limits.top;
    }
    if (startCoords.y > limits.bottom) {
      startCoords.y = limits.bottom;
    }
    if (startCoords.x < limits.left) {
      startCoords.x = limits.left;
    }
    if (startCoords.x > limits.right) {
      startCoords.x = limits.right;
    }

    mapPinMain.style.top = startCoords.y + 'px';
    mapPinMain.style.left = startCoords.x + 'px';
    window.util.setAttributes(window.adressInput, {
      'value': getPinCoord(),
    });
  };
  var onMouseUp = function (evt) {
    evt.preventDefault();
    window.activeMode.getActiveMode();
    window.backend.load(window.map.onSuccessLoad, window.form.onErrorSubmit);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    window.util.setAttributes(window.adressInput, {
      'value': getPinCoord(),
    });
  };

  window.pin = {
    MAIN_PIN_XSIZE: 64,
    MAIN_PIN_YSIZE: 84,
    MAIN_PIN_ROUND_YSIZE: 64,
    MAIN_PIN_XCOORD: 570,
    MAIN_PIN_YCOORD: 375,

    renderPin: function (pin) {
      var pinElement = similarPinTemplate.cloneNode(true);
      if (!('offer' in pin)) {
        pinElement.classList.add('hidden');
      }
      pinElement.style.left = (pin.location.x - PIN_ELEM_XSIZE / 2) + 'px';
      pinElement.style.top = (pin.location.y - PIN_ELEM_YSIZE) + 'px';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
      return pinElement;
    },

    onMouseDown: function (evt) {
      window.form.setTitleField();
      window.form.setPriceField();
      window.form.changeGuestsOption(housingRoomsSelect, housingGuestsSelect);
      evt.preventDefault();
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
  };

  mapPinMain.addEventListener('mousedown', window.pin.onMouseDown);
})();
