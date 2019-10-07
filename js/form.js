'use strict';

(function () {
  var NUMBER_OF_ROOMS = 100;
  var GUESTS_CAPACITY = 0;
  var housingRoomsSelect = document.querySelector('#room_number');
  var housingGuestsSelect = document.querySelector('#capacity');

  var changeGuestsOption = function (room, guests) {
    guests.addEventListener('change', function () {
      var roomValue = room.value;
      var guestsCapacity = guests.value;
      if ((Number(roomValue) < Number(guestsCapacity)) || (Number(guestsCapacity) === GUESTS_CAPACITY)) {
        housingGuestsSelect.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат.');
      } else {
        housingGuestsSelect.setCustomValidity('');
      }
      if ((Number(roomValue) === NUMBER_OF_ROOMS) && ((Number(guestsCapacity)) > GUESTS_CAPACITY)) {
        housingGuestsSelect.setCustomValidity('100 комнат не для гостей :)');
      } else if ((Number(roomValue) === NUMBER_OF_ROOMS)) {
        housingGuestsSelect.setCustomValidity('');
      }
    });
  };

  changeGuestsOption(housingRoomsSelect, housingGuestsSelect);

  window.adressInput.setAttribute('value', (window.pin.MAIN_PIN_XCOORD + (window.pin.MAIN_PIN_XSIZE / 2)) + ',' + ' ' + (window.pin.MAIN_PIN_YCOORD + (window.pin.MAIN_PIN_YSIZE - (window.pin.MAIN_PIN_YSIZE - window.pin.MAIN_PIN_XSIZE)) / 2));


})();
