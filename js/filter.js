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
    return typeHouse.value === ANY_VALUE ? el.offer.type : el.offer.type === typeHouse.value;
  };

  var filterRoomsNumber = function (el) {
    return housingRooms.value === ANY_VALUE ? el.offer.rooms : el.offer.rooms === Number(housingRooms.value);
  };

  var filterGuestsNumber = function (el) {
    return housingGuests.value === ANY_VALUE ? el.offer.guests : el.offer.guests === Number(housingGuests.value);
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
        updateAdverts = updateAdverts.filter(function (el) {
          return filterTypeHouse(el) && filterPrice(el) && filterRoomsNumber(el) && filterGuestsNumber(el) && filterFeature(el);
        });
        window.map.renderPinsAndAdverts(updateAdverts);
      });
    },
  };
})();
