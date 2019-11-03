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

  window.adressInput.setAttribute('value', (window.pin.MAIN_PIN_XCOORD + (window.pin.MAIN_PIN_XSIZE / 2)) + ',' + ' ' + (window.pin.MAIN_PIN_YCOORD + (window.pin.MAIN_PIN_ROUND_YSIZE / 2)));

  var addSuccessMessage = function () {
    var successTemplate = simillarSuccessTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', successTemplate);
  };

  var onSuccessSubmit = function () {
    window.activeMode.getDisableMode();
    addSuccessMessage();
    onSuccessFormMessage();
    window.map.deletePinsAndAdverts();
    window.adressInput.setAttribute('value', (window.pin.MAIN_PIN_XCOORD + (window.pin.MAIN_PIN_XSIZE / 2)) + ',' + ' ' + (window.pin.MAIN_PIN_YCOORD + (window.pin.MAIN_PIN_ROUND_YSIZE / 2)));
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
  };

  var onErrorFormMessage = function () {
    var error = main.querySelector('.error');
    var errorButton = document.querySelector('.error__button');
    error.addEventListener('click', closeErrorMessage);
    errorButton.addEventListener('click', closeErrorMessage);
    errorButton.addEventListener('keydown', onErrorMessageEnterPress);
    errorButton.addEventListener('blur', getFocusErrorButton, true);
    document.addEventListener('keydown', onErrorMessageEscPress);
    var elements = document.querySelectorAll('a, input, select, textarea, button');
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
      titleField.setAttribute('required', 'required');
      titleField.setAttribute('minlength', '30');
      titleField.setAttribute('maxlength', '100');
    },

    setPriceField: function () {
      priceField.setAttribute('required', 'required');
      priceField.setAttribute('max', '1000000');
      priceField.addEventListener('input', function () {
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
  };

  onSubmitButton();
  onResetForm();


})();
