'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarPinElement = map.querySelector('.map__pins');
  var main = document.querySelector('main');
  var fragment = document.createDocumentFragment();
  var SimillarErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  window.map = {
    successHandler: function (adverts) {
      for (var i = 0; i < adverts.length; i++) {
        fragment.appendChild(window.card.renderAdvert(adverts[i]));
        fragment.appendChild(window.pin.renderPin(adverts[i]));
      }
      similarPinElement.appendChild(fragment);

    },

    errorHandler: function (errorMessage) {
      var ErrorTemplate = SimillarErrorTemplate.cloneNode(true);
      ErrorTemplate.querySelector('.error__message').textContent = errorMessage;
      main.insertAdjacentElement('afterbegin', ErrorTemplate);
    },
  };
})();
