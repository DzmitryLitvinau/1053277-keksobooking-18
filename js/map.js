'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarPinElement = map.querySelector('.map__pins');
  var randomAdverts = window.data.getRandomSpecsArr();
  var fragment = document.createDocumentFragment();
  /* map.classList.remove('map--faded'); */
  for (var i = 0; i < randomAdverts.length; i++) {
    fragment.appendChild(window.card.renderAdvert(randomAdverts[i]));
    fragment.appendChild(window.pin.renderPin(randomAdverts[i]));
  }
  similarPinElement.appendChild(fragment);

})();
