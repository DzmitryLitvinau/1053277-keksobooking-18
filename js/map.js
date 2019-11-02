'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var typeHouse = document.querySelector('#housing-type');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingPrice = document.querySelector('#housing-price');
  var housingFeature = document.querySelector('#housing-features');
  var mapPinMain = mapPin.querySelector('.map__pin--main');
  var adverts = [];
  window.adverts = adverts;
  var mapFilters = document.querySelector('.map__filters');

  var openAdvertPopup = function (selected) {
    selected.classList.add('map__pin--active');
    if (selected.previousElementSibling) {
      selected.previousElementSibling.classList.remove('hidden');
    }
  };

  var hideAdverts = function () {
    var mapCard = mapPin.querySelectorAll('.map__card');
    Array.from(mapCard).forEach(function (advert) {
      advert.classList.add('hidden');
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
  var filterTypeHouse = function (typeOfHouse) {
    typeOfHouse.addEventListener('change', function (evt) {
      window.render(adverts.filter(function (advert) {
        if (evt.target.value === 'any') {
          return advert.offer.type;
        }
        return advert.offer.type === evt.target.value;
      }));
    });
  };

  var filterRoomsNumber = function (roomsNumber) {
    roomsNumber.addEventListener('change', function (evt) {

      window.debounce(function (number) {
        window.render(adverts.filter(function (advert) {
          if (evt.target.value === 'any') {
            return advert.offer.rooms;
          }
          return advert.offer.rooms === Number(evt.target.value);
        }))
        ;
      });
    });
  };

  var filterGuestsNumber = function (guestsNumber) {
    guestsNumber.addEventListener('change', function (evt) {
      window.render(adverts.filter(function (advert) {
        if (evt.target.value === 'any') {
          return advert.offer.guests;
        }
        return advert.offer.guests === Number(evt.target.value);
      }));
    });
  };

  var filterPrice = function (priceNumber) {
    priceNumber.addEventListener('change', function (evt) {
      window.render(adverts.filter(function (advert) {
        switch (evt.target.value) {
          case 'any':
            return advert.offer.price;
          case 'low':
            return (advert.offer.price < 10000);
          case 'middle':
            return (advert.offer.price >= 10000) && (advert.offer.price < 50000);
          case 'high':
            return (advert.offer.price >= 50000);
          default:
            throw new Error('Неизвестная сумма: «' + evt.target.value + '»');
        }
      }));
    });
  };

  var filterFeature = function (feature) {
    feature.addEventListener('change', function (evt) {
      window.render(adverts.filter(function (advert) {
        /*  var targetFeature = advert.offer.features.filter(function (el) {
           return el === evt.target.value;
         }); */
        // var targetFeature = advert.offer.features.includes(evt.target.value, 0);
        return advert.offer.features.filter(function () {
          return advert.offer.features.includes(evt.target.value, 0);
        });
        /* if (targetFeature) {
          var test = advert.offer.features;
        } */

        // return Boolean(advert.offer.features) === targetFeature;

        // return advert.offer.features[targetIndex];
      }));
    });
  };
  var filterArray = [filterTypeHouse(typeHouse), filterRoomsNumber(housingRooms), filterGuestsNumber(housingGuests), filterPrice(housingPrice), filterFeature(housingFeature)];

  mapFilters.addEventListener('change', function (evt) {
    mapFilters.children.filter(function (advert) {

    });
  });

  window.render = function (advert) {
    var takeNumber = advert.length > 5 ? 5 : advert.length;
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
    Array.from(smallMapPins).forEach(function (pin) {
      pin.addEventListener('click', window.map.onClickSmallPin);
    });
    // mapPin.addEventListener('click', window.map.onClickSmallPin);
    onClickAdvertPopupClose();
  };
  /* var filterSelect = document.querySelectorAll('.map__filters select');
  var filterInput = document.querySelectorAll('.map__filters input');
  filterSelect.forEach(function (el) {
    el.addEventListener('change', updateFilter);
  }); */


  window.map = {
    successHandler: function (data) {
      window.render(data);
      adverts = data;
      filterTypeHouse(typeHouse);
      filterRoomsNumber(housingRooms);
      filterGuestsNumber(housingGuests);
      filterPrice(housingPrice);
      filterFeature(housingFeature);
    },

    onMainPinEnterPress: function (evt) {
      window.util.isEnterEvent(evt, window.activeMode.getActiveMode);
    },

    onClickSmallPin: function (evt) {
      var smallMapPin = evt.target.closest('.map__pin');
      var smallMapPins = mapPin.querySelectorAll('.map__pin');
      Array.from(smallMapPins).forEach(function (pin) {
        pin.classList.remove('map__pin--active');
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
      Array.from(smallMapPins).forEach(function (pin) {
        if (pin.className !== 'map__pin map__pin--main') {
          pin.remove();
        }
      });
      Array.from(mapCard).forEach(function (advert) {
        advert.remove();
      });
    },
  };
})();
