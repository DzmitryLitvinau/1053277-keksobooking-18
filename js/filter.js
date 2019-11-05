'use strict';
(function () {
  var typeHouse = document.querySelector('#housing-type');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingPrice = document.querySelector('#housing-price');
  var housingFeature = document.querySelector('#housing-features');
  var ANY_VALUE = 'any';
  var Price = {
    MIN: 10000,
    MAX: 50000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filterTypeHouse = function (el) {
    if (typeHouse.value === ANY_VALUE) {
      return el.offer.type;
    } else {
      return el.offer.type === typeHouse.value;
    }
  };

  var filterRoomsNumber = function (el) {
    if (housingRooms.value === ANY_VALUE) {
      return el.offer.rooms;
    } else {
      return el.offer.rooms === Number(housingRooms.value);
    }
  };

  var filterGuestsNumber = function (el) {
    if (housingGuests.value === ANY_VALUE) {
      return el.offer.guests;
    } else {
      return el.offer.guests === Number(housingGuests.value);
    }
  };

  var filterPrice = function (el) {
    switch (housingPrice.value) {
      case ANY_VALUE:
        return el.offer.price;
      case Price.LOW:
        return (el.offer.price < Price.MIN);
      case Price.MIDDLE:
        return (el.offer.price >= Price.MIN) && (el.offer.price < Price.MAX);
      case Price.HIGH:
        return (el.offer.price >= Price.MAX);
      default:
        throw new Error('Неизвестная сумма: «' + housingPrice.value + '»');
    }

  };

  var filterFeature = function (el) {
    var checkedFeaturesItems = housingFeature.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return el.offer.features.includes(element.value);
    });
  };

  var updateAdverts = [];
  window.filter = {
    adverts: [],
    mapFilters: document.querySelector('.map__filters'),
    onFilterChange: function () {
      window.debounce(function () {
        updateAdverts = window.filter.adverts;
        updateAdverts = updateAdverts.filter(filterTypeHouse).filter(filterPrice).filter(filterRoomsNumber).filter(filterGuestsNumber).filter(filterFeature);
        window.map.renderPinsAndAdverts(updateAdverts);
      });
    },
  };
})();
