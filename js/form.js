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
  var PriceValue = {
    BUGNALO: '0',
    FLAT: '1000',
    HOUSE: '5000',
    PALACE: '10000',
    MAX_PRICE: '1000000',
  };
  var AccommodationType = {
    BUGNALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var setPriceToTypeHouse = function () {
    typeHouse.addEventListener('change', function () {
      switch (typeHouse.value) {
        case AccommodationType.BUGNALO:
          return window.util.setAttributes(priceField, {
            'min': PriceValue.BUGNALO,
            'placeholder': PriceValue.BUGNALO
          });
        case AccommodationType.FLAT:
          return window.util.setAttributes(priceField, {
            'min': PriceValue.FLAT,
            'placeholder': PriceValue.FLAT
          });
        case AccommodationType.HOUSE:
          return window.util.setAttributes(priceField, {
            'min': PriceValue.HOUSE,
            'placeholder': PriceValue.HOUSE
          });
        case AccommodationType.PALACE:
          return window.util.setAttributes(priceField, {
            'min': PriceValue.PALACE,
            'placeholder': PriceValue.PALACE
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

  var submitForm = function (evt) {
    window.save(new FormData(adForm), onSuccessSubmit, window.form.onErrorSubmit);
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
    var elements = document.querySelectorAll('a, input, select, textarea, button, img, button[type="button"]');
    error.remove();
    document.removeEventListener('keydown', onErrorMessageEscPress);
    errorButton.removeEventListener('keydown', onErrorMessageEnterPress);
    Array.from(elements).forEach(function (element) {
      element.removeAttribute('tabIndex');
    });
  };

  var onErrorFormMessage = function () {
    var error = main.querySelector('.error');
    var errorButton = document.querySelector('.error__button');
    var elements = document.querySelectorAll('a, input, select, textarea, button, img, button[type="button"]');
    error.addEventListener('click', closeErrorMessage);
    errorButton.addEventListener('click', closeErrorMessage);
    errorButton.addEventListener('keydown', onErrorMessageEnterPress);
    errorButton.addEventListener('blur', getFocusErrorButton, true);
    document.addEventListener('keydown', onErrorMessageEscPress);
    Array.from(elements).forEach(function (element) {
      element.tabIndex = -1;
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
        'min': PriceValue.FLAT,
        'max': PriceValue.MAX_PRICE,
        'placeholder': PriceValue.FLAT
      });
      priceField.addEventListener('input', function () {
        if (Number(priceField.value) > PriceValue.MAX_PRICE) {
          priceField.setCustomValidity('Цена за ночь не должна превышать ' + PriceValue.MAX_PRICE);
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

    onErrorSubmit: function (errorMessage) {
      addErrorMessage(errorMessage);
      onErrorFormMessage();
    },
  };

  onSubmitButton();
  onResetForm();


})();
