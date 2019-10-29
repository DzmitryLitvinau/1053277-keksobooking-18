'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  window.pin = {
    PIN_ELEM_XSIZE: 40,
    PIN_ELEM_YSIZE: 40,
    MAIN_PIN_XSIZE: 62,
    MAIN_PIN_YSIZE: 84,
    MAIN_PIN_XCOORD: 570,
    MAIN_PIN_YCOORD: 375,

    renderPin: function (pin) {
      var pinElement = similarPinTemplate.cloneNode(true);
      pinElement.style.left = (pin.location.x - window.pin.PIN_ELEM_XSIZE / 2) + 'px';
      pinElement.style.top = (pin.location.y - window.pin.PIN_ELEM_YSIZE) + 'px';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
      return pinElement;
    },
  };

  var mainPin = document.querySelector('.map__pin--main');
  var housingRoomsSelect = document.querySelector('#room_number');
  var housingGuestsSelect = document.querySelector('#capacity');

  mainPin.addEventListener('mousedown', function (evt) {
    window.activeMode.getActiveMode();
    window.form.setTitleField();
    window.form.setPriceField();
    window.form.changeGuestsOption(housingRoomsSelect, housingGuestsSelect);
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var mapOverlay = document.querySelector('.map__overlay');
    var mapOverlayCoords = mapOverlay.getBoundingClientRect();
    var limits = {
      top: 130,
      right: mapOverlayCoords.width + mapOverlayCoords.left,
      bottom: 630,
      left: mapOverlayCoords.left,
    };

    // var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      if (startCoords.x > limits.right) {
        shift.x = 0;
      }
      if (startCoords.x < limits.left) {
        shift.x = 0;
      }
      if (startCoords.y > limits.bottom) {
        shift.y = 0;
      }
      if (startCoords.y < limits.top) {
        shift.y = 0;
      }
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      /*   if (moveEvt.clientX > limits.right) {
          startCoords.x = limits.right;
        } else if (moveEvt.clientX > limits.left) {
          startCoords.x = moveEvt.clientX;
        }
        if (moveEvt.clientY > limits.bottom) {
          startCoords.y = limits.bottom;
        } else if (moveEvt.clientY > limits.top) {
          startCoords.y = moveEvt.clientY;
        } */


      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      window.adressInput.setAttribute('value', getPinCoord());
    };

    var getPinCoord = function () {
      var leftCoord = Number(mainPin.style.left.slice(0, -2)) + (window.pin.MAIN_PIN_XSIZE / 2);
      var topCoord = Number(mainPin.style.top.slice(0, -2)) + window.pin.MAIN_PIN_YSIZE;
      var pinCoord = leftCoord + ', ' + topCoord;
      return pinCoord;
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.adressInput.setAttribute('value', getPinCoord());
      /*  if (dragged) {
         var onClickPreventDefault = function (onClickEvt) {
           onClickEvt.preventDefault();
           mainPin.removeEventListener('click', onClickPreventDefault);
           window.adressInput.setAttribute('value', getPinCoord());
         };

         mainPin.addEventListener('click', onClickPreventDefault);
       } */

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
