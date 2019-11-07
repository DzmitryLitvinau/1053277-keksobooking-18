'use strict';

(function () {
  var similarAdvertTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  window.card = {
    renderAdvert: function (advert) {
      var advertElement = similarAdvertTemplate.cloneNode(true);
      for (var prop in advert.offer) {
        if (advert.offer[prop].length < 1) {
          advertElement.querySelector('[class*=' + prop + ']').classList.add('hidden');
          advertElement.querySelector('[class*=' + prop + ']').firstElementChild.classList.add('hidden');
        }
      }
      advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
      advertElement.querySelector('.popup__title').textContent = advert.offer.title;
      advertElement.querySelector('.popup__text--address').textContent = advert.offer.address;
      advertElement.querySelector('.popup__text--price').innerHTML = advert.offer.price + '&#x20bd;<span>/ночь</span>';
      advertElement.querySelector('.popup__type').textContent = advert.offer.type;
      advertElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
      advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
      var mainFeatures = advertElement.querySelector('.popup__features');
      var randomFeatures = advertElement.querySelectorAll('.popup__feature');
      var fragment = document.createDocumentFragment();
      for (var element in advert.offer.features) {
        if (advert.offer.features) {
          var featureElement = advert.offer.features[element];
          randomFeatures.forEach(function (elem) {
            elem.remove();
          });
          var popupFeature = document.createElement('li');
          popupFeature.className = 'popup__feature popup__feature--' + featureElement;
          fragment.appendChild(popupFeature);
        }
      }
      mainFeatures.appendChild(fragment);
      advertElement.querySelector('.popup__description').textContent = advert.offer.description;
      advertElement.querySelector('.popup__photo').src = advert.offer.photos[0];
      var mainPhotos = advertElement.querySelector('.popup__photos');
      var randomPhoto = advertElement.querySelector('.popup__photo');
      for (var j = 1; j < advert.offer.photos.length; j++) {
        var randomPhotoClone = randomPhoto.cloneNode(true);
        fragment.appendChild(randomPhotoClone);
        randomPhotoClone.src = advert.offer.photos[j];
      }
      mainPhotos.appendChild(fragment);
      return advertElement;
    },
  };
})();
