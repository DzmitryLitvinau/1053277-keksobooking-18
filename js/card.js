'use strict';

(function () {
  var similarAdvertTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  window.card = {
    renderAdvert: function (advert) {
      var advertElement = similarAdvertTemplate.cloneNode(true);
      advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
      advertElement.querySelector('.popup__title').textContent = advert.offer.title;
      advertElement.querySelector('.popup__text--address').textContent = advert.offer.address;
      advertElement.querySelector('.popup__text--price').innerHTML = advert.offer.price + '&#x20bd;<span>/ночь</span>';
      advertElement.querySelector('.popup__type').textContent = advert.offer.type;
      advertElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
      advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
      var mainFeatures = advertElement.querySelector('.popup__features');
      var randomFeature = advertElement.querySelectorAll('.popup__feature');
      for (var i = randomFeature.length; i > advert.offer.features.length; i--) {
        mainFeatures.removeChild(randomFeature[i - 1]);
      }
      advertElement.querySelector('.popup__description').textContent = advert.offer.description;
      advertElement.querySelector('.popup__photo').src = advert.offer.photos[0];
      for (var j = 1; j < advert.offer.photos.length; j++) {
        var mainPhotos = advertElement.querySelector('.popup__photos');
        var randomPhoto = advertElement.querySelector('.popup__photo');
        var randomPhotoClone = randomPhoto.cloneNode(true);
        mainPhotos.appendChild(randomPhotoClone);
        randomPhotoClone.src = advert.offer.photos[j];
      }
      return advertElement;
    },
  };
})();
