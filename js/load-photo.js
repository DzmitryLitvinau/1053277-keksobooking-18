'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var chooseImg = function (fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      if (file) {
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (element) {
          return fileName.endsWith(element);
        });
      }

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview(reader.result);
        });
        reader.readAsDataURL(file);
      }
    });
  };

  var imageChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var defaultAvatar = previewAvatar.src;

  var addPhotoAvatar = function (readerResult) {
    previewAvatar.src = readerResult;
  };

  chooseImg(imageChooserAvatar, addPhotoAvatar);

  var accomodationImageChooser = document.querySelector('.ad-form__upload input[type=file]');
  var accomodationFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var accomodationPhoto = document.querySelector('.ad-form__photo');
  var fragment = document.createDocumentFragment();

  var similarPhotoTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup__photo');

  var renderAccomodationPhoto = function (readerResult) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.src = readerResult;
    var photoAccomodationClone = accomodationPhoto.cloneNode(true);
    if (accomodationPhoto) {
      accomodationPhoto.remove();
    }
    window.util.setAttributes(photoAccomodationClone, {
      'style': 'display:flex; justify-content: center; align-items: center',
    });
    photoAccomodationClone.appendChild(photoElement);
    fragment.appendChild(photoAccomodationClone);
    accomodationFormPhotoContainer.appendChild(fragment);
  };

  chooseImg(accomodationImageChooser, renderAccomodationPhoto);

  window.loadPhoto = {
    resetPhotosForm: function () {
      previewAvatar.src = defaultAvatar;
      var photosAccomodation = accomodationFormPhotoContainer.querySelectorAll('.ad-form__photo');
      photosAccomodation.forEach(function (element) {
        if ((element.classList.contains('ad-form__photo'))) {
          element.remove();
        }
      });
      accomodationFormPhotoContainer.appendChild(accomodationPhoto);
    },
  };
})();
