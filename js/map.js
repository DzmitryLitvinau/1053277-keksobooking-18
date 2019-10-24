'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var typeHouse = document.querySelector('#housing-type');
  var adverts = [];
  window.adverts = adverts;

  window.render = function (advert) {
    var takeNumber = advert.length > 5 ? 5 : advert.length;
    mapPin.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(window.card.renderAdvert(advert[i]));
      fragment.appendChild(window.pin.renderPin(advert[i]));
    }
    mapPin.appendChild(fragment);
    window.map.hideAdverts();
    window.map.onClickPin();
    window.map.onClickAdvertPopupClose();

    // window.map.onAdvertPopupEscPress();
  };

  window.map = {
    successHandler: function (data) {
      adverts = data;
      window.map.filterTypeHouse(typeHouse);
    },

    openAdvertPopup: function (selected) {

      selected.classList.add('map__pin--active');
      selected.previousElementSibling.classList.remove('hidden');
    },

    hideAdverts: function () {
      var mapCard = mapPin.querySelectorAll('.map__card');
      Array.from(mapCard).forEach(function (advert) {
        advert.classList.add('hidden');
      });
    },

    onClickPin: function () {
      mapPin.addEventListener('click', function (evt) {
        var smallMapPin = evt.target.closest('.map__pin');
        var smallMapPins = mapPin.querySelectorAll('.map__pin');
        Array.from(smallMapPins).forEach(function (pin) {
          pin.classList.remove('map__pin--active');
        });
        window.map.hideAdverts();
        if (smallMapPin) {
          window.map.openAdvertPopup(smallMapPin);
        }
      });
      document.addEventListener('keydown', window.map.onAdvertPopupEscPress);
    },

    deletePinsAndAdverts: function () {
      var smallMapPins = mapPin.querySelectorAll('.map__pin');
      var mapCard = mapPin.querySelectorAll('.map__card');
      Array.from(smallMapPins).forEach(function (pin) {
        pin.remove();
      });
      Array.from(mapCard).forEach(function (advert) {
        advert.remove();
      });
    },

    closeAdvertPopup: function (selected) {
      selected.parentElement.classList.add('hidden');
    },

    onAdvertPopupEscPress: function (evt) {
      window.util.isEscEvent(evt, window.map.hideAdverts);
    },

    onClickAdvertPopupClose: function () {
      mapPin.addEventListener('click', function (evt) {
        var target = evt.target;
        if (target.className === 'popup__close') {
          window.map.closeAdvertPopup(target);
        }
      });
    },

    filterTypeHouse: function (typeOfHouse) {
      typeOfHouse.addEventListener('change', function () {
        Array.from(typeOfHouse.children).forEach(function (select) {
          window.render(adverts.filter(function (house) {
            return house.offer.type === 'house';
          }));
        });
      });
    },
    /* filterTypeHouse: function (typeOfHouse) {

      Array.from(typeOfHouse.children).forEach(function (select) {
        typeOfHouse.addEventListener('change', function () {
          window.render(adverts.filter(function (house) {
            return house.offer.type === select.value;
          }));
        });
      });
    }, */

    /* filterTypeHouse: function (typeOfHouse) {
      typeOfHouse.addEventListener('change', function (evt) {
        var arrayHouses = Array.from(typeOfHouse.children);
        var neededAdvert = window.render(adverts.filter(function (house) {
          return house.offer.type === arrayHouses.value;
        }));
        switch (arrayHouses) {
          case 'House':
            return neededAdvert;
        }
      });
    }, */
  };


  window.map.filterTypeHouse(typeHouse);

})();
