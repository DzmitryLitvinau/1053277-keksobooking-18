'use strict';

(function () {
  var TITLE = 'Апартаменты в центре Минска';
  var TYPE_OPTIONS = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = CHECKIN_TIMES;
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = 'Стильная квартира в жилом небоскребе Минска. Центр города, удобное транспортное сообщение. Охраняемая закрытая домовая территория, парковка, детская площадка. Рядом супермаркет.';
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var RANDOM_ADVERTS_AMOUNT = 8;
  var MAP_OVERLAY_XSIZE = 1200;
  window.data = {
    getRandomAdvert: function (avatarNumber) {
      var randomAdvert = {
        author: {
          avatar: 'img/avatars/user{{x}}.png'.replace('{{x}}', String(0) + avatarNumber),
        },
        location: {
          x: window.util.getRandomIntInclusive(0, MAP_OVERLAY_XSIZE),
          y: window.util.getRandomIntInclusive(130, 630),
        },
        offer: {
          title: TITLE,
          price: window.util.getRandomIntInclusive(3000, 15000),
          type: TYPE_OPTIONS[window.util.getRandomIntInclusive(0, TYPE_OPTIONS.length - 1)],
          rooms: window.util.getRandomIntInclusive(1, 4),
          guests: window.util.getRandomIntInclusive(1, 5),
          checkin: CHECKIN_TIMES[window.util.getRandomIntInclusive(0, CHECKIN_TIMES.length - 1)],
          checkout: CHECKOUT_TIMES[window.util.getRandomIntInclusive(0, CHECKOUT_TIMES.length - 1)],
          features: FEATURES.slice(0, window.util.getRandomIntInclusive(1, FEATURES.length)),
          description: DESCRIPTION.slice(0, window.util.getRandomIntInclusive(0, DESCRIPTION.length - 1)),
          photos: PHOTOS.slice(0, window.util.getRandomIntInclusive(1, PHOTOS.length)),
        },
      };
      randomAdvert.offer.address = '{{location.x}}, {{location.y}}'.replace('{{location.x}}, {{location.y}}', randomAdvert.location.x + ',' + ' ' + randomAdvert.location.y);
      return randomAdvert;
    },

    getRandomSpecsArr: function () {
      var randomAdverts = [];
      for (var i = 1; i <= RANDOM_ADVERTS_AMOUNT; i++) {
        var randomAdvert = window.data.getRandomAdvert(i);
        randomAdverts.push(randomAdvert);
      }
      return randomAdverts;
    },
  };
})();
