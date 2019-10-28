'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var typeHouse = document.querySelector('#housing-type');
  var mapPinMain = mapPin.querySelector('.map__pin--main');
  var adverts = [];
  window.adverts = adverts;
  // var mapFilters = document.querySelector('.map__filters');
  window.render = function (advert) {
    var takeNumber = advert.length > 5 ? 5 : advert.length;
    mapPin.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(window.card.renderAdvert(advert[i]));
      fragment.appendChild(window.pin.renderPin(advert[i]));
    }
    mapPin.appendChild(fragment);
    window.map.hideAdverts();
    mapPin.addEventListener('click', window.map.onClickSmallPin);
    window.map.onClickAdvertPopupClose();
  };
  /* var filterSelect = document.querySelectorAll('.map__filters select');
  var filterInput = document.querySelectorAll('.map__filters input');
  filterSelect.forEach(function (el) {
    el.addEventListener('change', updateFilter);
  }); */
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

    onMainPinEnterPress: function (evt) {
      window.util.isEnterEvent(evt, window.activeMode.getActiveMode);
    },

    onClickSmallPin: function (evt) {
      var smallMapPin = evt.target.closest('.map__pin');
      var smallMapPins = mapPin.querySelectorAll('.map__pin');
      Array.from(smallMapPins).forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });
      window.map.hideAdverts();
      if (smallMapPin && (mapPinMain.className !== 'map__pin--main')) {
        window.map.openAdvertPopup(smallMapPin);
      }
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
        Array.from(typeOfHouse.children).forEach(function () {
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

  };


  window.map.filterTypeHouse(typeHouse);

})();
