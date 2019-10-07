'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  window.pin = {
    PIN_ELEM_XSIZE: 50,
    PIN_ELEM_YSIZE: 70,
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
})();
