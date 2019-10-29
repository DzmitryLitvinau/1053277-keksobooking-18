'use strict';

(function () {
  var NUMBER_OF_ROOMS = 100;
  var GUESTS_CAPACITY = 0;

  var typeHouse = document.querySelector('#type');
  var priceField = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
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

  var buttonReset = adForm.querySelector('.ad-form__reset');

  // не рабочий код с switch
  /*   var typeHouseValues = Array.from(typeHouse.children).map(function (it) {
    return it.value;
  });
  var getValues = function (values) {
    switch (values) {
      case 'bungalo':
        return priceField.setAttribute('min', '0');
      case 'flat':
        return priceField.setAttribute('min', '1000');
      case 'house':
        return priceField.setAttribute('min', '5000');
      case 'palace':
        return priceField.setAttribute('min', '10000');
      default:
        throw new Error('Неизвестное тип жилья: «' + values + '»');
    }
  }; */
  var setPriceToTypeHouse = function () {
    typeHouse.addEventListener('change', function () {
      if (typeHouse.value === 'bungalo') {
        priceField.setAttribute('min', '0');
        priceField.setAttribute('placeholder', '0');
      } else if (typeHouse.value === 'flat') {
        priceField.setAttribute('min', '1000');
        priceField.setAttribute('placeholder', '1000');
      } else if (typeHouse.value === 'house') {
        priceField.setAttribute('min', '5000');
        priceField.setAttribute('placeholder', '5000');
      } else if (typeHouse.value === 'palace') {
        priceField.setAttribute('min', '10000');
        priceField.setAttribute('placeholder', '10000');
      }
    });
  };

  var connectTimeInToTimeOut = function () {
    timeIn.addEventListener('change', function (evt) {
      timeOut.value = evt.target.value;
    });
  };

  var connectTimeOutToTimeIn = function () {
    timeOut.addEventListener('change', function (evt) {
      timeIn.value = evt.target.value;
    });
  };

  setPriceToTypeHouse();
  connectTimeInToTimeOut();
  connectTimeOutToTimeIn();

  window.adressInput.setAttribute('value', (window.pin.MAIN_PIN_XCOORD + (window.pin.MAIN_PIN_XSIZE / 2)) + ',' + ' ' + (window.pin.MAIN_PIN_YCOORD + window.pin.MAIN_PIN_YSIZE));

  window.form = {
    addSuccessMessage: function () {
      var successTemplate = simillarSuccessTemplate.cloneNode(true);
      main.insertAdjacentElement('afterbegin', successTemplate);

    },
    setTitleField: function () {
      var titleField = document.querySelector('#title');
      titleField.setAttribute('required', 'required');
      titleField.setAttribute('minlength', '30');
      titleField.setAttribute('maxlength', '100');
    },

    setPriceField: function () {
      priceField.setAttribute('required', 'required');
      priceField.setAttribute('max', '1000000');
      priceField.addEventListener('blur', function () {
        if (Number(priceField.value) > 1000000) {
          priceField.setCustomValidity('Цена за ночь не должна превышать 1000000');
        } else {
          priceField.setCustomValidity('');
        }
      });
    },
    changeGuestsOption: function (room, guests) {
      guests.value = room.value;
      guests.addEventListener('change', function () {
        var roomValue = room.value;
        var guestsCapacity = guests.value;
        if ((Number(roomValue) < Number(guestsCapacity)) || (Number(guestsCapacity) === GUESTS_CAPACITY)) {
          guests.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат.');
        } else {
          guests.setCustomValidity('');
        }
        if ((Number(roomValue) === NUMBER_OF_ROOMS) && ((Number(guestsCapacity)) > GUESTS_CAPACITY)) {
          guests.setCustomValidity('100 комнат не для гостей :)');
        } else if ((Number(roomValue) === NUMBER_OF_ROOMS)) {
          guests.setCustomValidity('');
        }
      });
    },
    onSuccessSubmit: function () {
      window.activeMode.getDisableMode();
      window.form.addSuccessMessage();
      window.form.onSuccessFormMessage();
      window.map.deletePinsAndAdverts();
      mapPin.appendChild(mainPinClone);
      mainPinClone.addEventListener('mousedown', window.activeMode.getActiveMode);
      mainPinClone.addEventListener('keydown', window.activeMode.getActiveMode);
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
      window.save(new FormData(adForm), window.form.onSuccessSubmit, window.form.onErrorSubmit);
      /* window.save(new FormData(adForm), window.form.onSuccessSubmit, window.form.onSuccessSubmit); */
      evt.preventDefault();
    },

    onSubmitButton: function () {
      adForm.addEventListener('submit', function (evt) {
        window.form.submitForm(evt);
      });
      mainPin.removeEventListener('keydown', window.map.onMainPinEnterPress);
      mapPin.removeEventListener('click', window.map.onClickSmallPin);
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
      var errorButton = document.querySelector('.error__button');
      error.addEventListener('click', window.form.closeErrorMessage);
      errorButton.addEventListener('click', window.form.closeErrorMessage);
      errorButton.addEventListener('keydown', window.form.onErrorMessageEnterPress);
      errorButton.addEventListener('blur', window.form.getFocusErrorButton, true);
      document.addEventListener('keydown', window.form.onErrorMessageEscPress);
      // window.form.onErrorMessageButtonPress();
      // Для поддержки в firefox
      var elements = document.querySelectorAll('a, input, select, textarea, button');
      Array.from(elements).forEach(function (el) {
        el.tabIndex = -1;
      });
      errorButton.focus();
      errorButton.tabIndex = 1;
    },

    onErrorMessageEscPress: function (evt) {
      window.util.isEscEvent(evt, window.form.closeErrorMessage);
    },

    onErrorMessageEnterPress: function (evt) {
      window.util.isEnterEvent(evt, window.form.closeErrorMessage);
    },
    getFocusErrorButton: function () {
      var errorButton = document.querySelector('.error__button');
      errorButton.focus();
    },
    /* onErrorMessageButtonPress: function () {
      var errorButton = document.querySelector('.error__button');
      errorButton.addEventListener('click', window.form.closeErrorMessage);
      errorButton.addEventListener('keydown', window.form.onErrorMessageEnterPress);
    }, */

    onResetForm: function () {
      buttonReset.addEventListener('click', function () {
        window.activeMode.getDisableMode();
        window.map.deletePinsAndAdverts();
        mapPin.appendChild(mainPinClone);
        mainPinClone.focus();
        mainPinClone.addEventListener('mousedown', window.activeMode.getActiveMode);
        mainPinClone.addEventListener('keydown', window.map.onMainPinEnterPress);
        // mainPin.removeEventListener('keydown', window.map.onMainPinEnterPress);
      });
    },
  };

  window.form.onSubmitButton();
  window.form.onResetForm();


})();
