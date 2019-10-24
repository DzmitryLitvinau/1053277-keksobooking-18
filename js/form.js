'use strict';

(function () {
  var NUMBER_OF_ROOMS = 100;
  var GUESTS_CAPACITY = 0;
  var housingRoomsSelect = document.querySelector('#room_number');
  var housingGuestsSelect = document.querySelector('#capacity');
  var adForm = document.querySelector('.ad-form');
  var main = document.querySelector('main');
  var simillarSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var simillarErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinClone = mainPin.cloneNode(true);
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');

  //   var success = main.querySelector('.success');
  //   var error = main.querySelector('.error');
  var buttonReset = adForm.querySelector('.ad-form__reset');

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

  window.form = {
    addSuccessMessage: function () {
      var successTemplate = simillarSuccessTemplate.cloneNode(true);
      main.insertAdjacentElement('afterbegin', successTemplate);
    },

    onSuccessSubmit: function () {
      window.activeMode.getDisableMode();
      window.form.addSuccessMessage();
      window.form.onSuccessFormMessage();
      window.map.deletePinsAndAdverts();
      mapPin.appendChild(mainPinClone);
      mainPinClone.addEventListener('mousedown', window.activeMode.getActiveMode);
    },

    addErrorMessage: function (errorMessage) {
      var errorTemplate = simillarErrorTemplate.cloneNode(true);
      errorTemplate.querySelector('.error__message').textContent = errorMessage;
      main.insertAdjacentElement('afterbegin', errorTemplate);
    },

    onErrorSubmit: function (errorMessage) {
      window.form.addErrorMessage(errorMessage);
      window.form.onErrorFormMessage();
    },

    submitForm: function (evt) {
      /*  window.save(new FormData(adForm), window.form.onSuccessSubmit, window.form.onErrorSubmit); */
      window.save(new FormData(adForm), window.form.onSuccessSubmit, window.form.onSuccessSubmit);
      evt.preventDefault();
    },

    onSubmitButton: function () {
      // ошибка 400 при отправке
      adForm.addEventListener('submit', function (evt) {
        window.form.submitForm(evt);
      });
    },

    onSuccessMessageEscPress: function (evt) {
      window.util.isEscEvent(evt, window.form.closeSuccessMessage);
    },

    closeSuccessMessage: function () {
      var success = main.querySelector('.success');
      success.remove();
      document.removeEventListener('keydown', window.form.onSuccessMessageEscPress);
    },

    onSuccessFormMessage: function () {
      var success = main.querySelector('.success');
      success.addEventListener('click', window.form.closeSuccessMessage);
      document.addEventListener('keydown', window.form.onSuccessMessageEscPress);
    },

    closeErrorMessage: function () {
      var errorButton = document.querySelector('.error__button');
      var error = main.querySelector('.error');
      error.remove();
      document.removeEventListener('keydown', window.form.onErrorMessageEscPress);
      errorButton.removeEventListener('keydown', window.form.onErrorMessageEnterPress);

    },

    onErrorFormMessage: function () {
      var error = main.querySelector('.error');
      error.addEventListener('click', window.form.closeErrorMessage);
      window.form.onErrorMessageButtonPress();
      document.addEventListener('keydown', window.form.onErrorMessageEscPress);
    },

    onErrorMessageEscPress: function (evt) {
      window.util.isEscEvent(evt, window.form.closeErrorMessage);
    },

    onErrorMessageEnterPress: function (evt) {
      window.util.isEnterEvent(evt, window.form.closeErrorMessage);
    },

    onErrorMessageButtonPress: function () {
      var errorButton = document.querySelector('.error__button');
      errorButton.focus();
      errorButton.addEventListener('click', window.form.closeErrorMessage);
      errorButton.addEventListener('keydown', window.form.onErrorMessageEnterPress);
    },

    onResetForm: function () {
      buttonReset.addEventListener('click', function () {
        window.activeMode.getDisableMode();
        window.map.deletePinsAndAdverts();
        mapPin.appendChild(mainPinClone);
        mainPinClone.addEventListener('mousedown', window.activeMode.getActiveMode);
      });
    },
  };

  window.form.onSubmitButton();
  window.form.onResetForm();
})();
