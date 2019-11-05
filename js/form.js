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
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var buttonReset = adForm.querySelector('.ad-form__reset');
  var elements = document.querySelectorAll('a, input, select, textarea, button');
  var PRICE_VALUES = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000',
    maxValue: '1000000',
  };
  var TYPES_HOUSES = {
    bungalo: 'bungalo',
    flat: 'flat',
    house: 'house',
    palace: 'palace'
  };

  var setPriceToTypeHouse = function () {
    typeHouse.addEventListener('change', function () {
      switch (typeHouse.value) {
        case TYPES_HOUSES.bungalo:
          return window.util.setAttributes(priceField, {
            'min': PRICE_VALUES.bungalo,
            'placeholder': PRICE_VALUES.bungalo
          });
        case TYPES_HOUSES.flat:
          return window.util.setAttributes(priceField, {
            'min': PRICE_VALUES.flat,
            'placeholder': PRICE_VALUES.flat
          });
        case TYPES_HOUSES.house:
          return window.util.setAttributes(priceField, {
            'min': PRICE_VALUES.house,
            'placeholder': PRICE_VALUES.house
          });
        case TYPES_HOUSES.palace:
          return window.util.setAttributes(priceField, {
            'min': PRICE_VALUES.palace,
            'placeholder': PRICE_VALUES.palace
          });
        default:
          throw new Error('Неизвестная сумма: «' + typeHouse.value + '»');
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
  var setAdressInput = function () {
    window.util.setAttributes(window.adressInput, {
      'value': (window.pin.MAIN_PIN_XCOORD + (window.pin.MAIN_PIN_XSIZE / 2)) + ',' + ' ' + (window.pin.MAIN_PIN_YCOORD + (window.pin.MAIN_PIN_ROUND_YSIZE / 2)),
    });
  };
  setAdressInput();

  var addSuccessMessage = function () {
    var successTemplate = simillarSuccessTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', successTemplate);
  };

  var onSuccessSubmit = function () {
    window.activeMode.getDisableMode();
    addSuccessMessage();
    onSuccessFormMessage();
    window.map.deletePinsAndAdverts();
    setAdressInput();
    mapPinMain.style.left = window.pin.MAIN_PIN_XCOORD + 'px';
    mapPinMain.style.top = window.pin.MAIN_PIN_YCOORD + 'px';

    mapPinMain.addEventListener('mousedown', window.activeMode.getActiveMode);
    mapPinMain.addEventListener('keydown', window.activeMode.getActiveMode);
  };

  var addErrorMessage = function (errorMessage) {
    var errorTemplate = simillarErrorTemplate.cloneNode(true);
    errorTemplate.querySelector('.error__message').textContent = errorMessage;
    main.insertAdjacentElement('afterbegin', errorTemplate);
  };

  var onErrorSubmit = function (errorMessage) {
    addErrorMessage(errorMessage);
    onErrorFormMessage();
  };

  var submitForm = function (evt) {
    window.save(new FormData(adForm), onSuccessSubmit, onErrorSubmit);
    evt.preventDefault();
  };

  var onSubmitButton = function () {
    adForm.addEventListener('submit', function (evt) {
      submitForm(evt);
    });
    mapPinMain.removeEventListener('keydown', window.map.onMainPinEnterPress);
    mapPin.removeEventListener('click', window.map.onClickSmallPin);
  };

  var onSuccessMessageEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSuccessMessage);
  };

  var closeSuccessMessage = function () {
    var success = main.querySelector('.success');
    success.remove();
    document.removeEventListener('keydown', onSuccessMessageEscPress);
  };

  var onSuccessFormMessage = function () {
    var success = main.querySelector('.success');
    success.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  };

  var closeErrorMessage = function () {
    var errorButton = document.querySelector('.error__button');
    var error = main.querySelector('.error');
    error.remove();
    document.removeEventListener('keydown', onErrorMessageEscPress);
    errorButton.removeEventListener('keydown', onErrorMessageEnterPress);
    Array.from(elements).forEach(function (el) {
      el.removeAttribute('tabIndex');
    });
  };

  var onErrorFormMessage = function () {
    var error = main.querySelector('.error');
    var errorButton = document.querySelector('.error__button');
    error.addEventListener('click', closeErrorMessage);
    errorButton.addEventListener('click', closeErrorMessage);
    errorButton.addEventListener('keydown', onErrorMessageEnterPress);
    errorButton.addEventListener('blur', getFocusErrorButton, true);
    document.addEventListener('keydown', onErrorMessageEscPress);
    /* var elements = document.querySelectorAll('a, input, select, textarea, button'); */
    Array.from(elements).forEach(function (el) {
      el.tabIndex = -1;
    });
    errorButton.focus();
    errorButton.tabIndex = 1;
  };

  var onErrorMessageEscPress = function (evt) {
    window.util.isEscEvent(evt, closeErrorMessage);
  };

  var onErrorMessageEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closeErrorMessage);
  };

  var getFocusErrorButton = function () {
    var errorButton = document.querySelector('.error__button');
    errorButton.focus();
  };

  var onResetForm = function () {
    buttonReset.addEventListener('click', function () {
      window.activeMode.getDisableMode();
      window.map.deletePinsAndAdverts();
      mapPin.appendChild(mapPinMain);
      mapPinMain.focus();
      mapPinMain.addEventListener('mousedown', window.activeMode.getActiveMode);
      mapPinMain.addEventListener('keydown', window.map.onMainPinEnterPress);
    });
  };

  window.form = {
    setTitleField: function () {
      var titleField = document.querySelector('#title');
      window.util.setAttributes(titleField, {
        'required': 'required',
        'minlength': '30',
        'maxlength': '100',
      });
    },

    setPriceField: function () {
      window.util.setAttributes(priceField, {
        'required': 'required',
        'min': PRICE_VALUES.flat,
        'max': PRICE_VALUES.maxValue,
        'placeholder': PRICE_VALUES.flat
      });
      priceField.addEventListener('input', function () {
        if (Number(priceField.value) > PRICE_VALUES.maxValue) {
          priceField.setCustomValidity('Цена за ночь не должна превышать ' + PRICE_VALUES.maxValue);
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
  };

  onSubmitButton();
  onResetForm();


})();
