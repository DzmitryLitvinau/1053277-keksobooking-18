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

  var accommodationImageChooser = document.querySelector('.ad-form__upload input[type=file]');
  var accommodationFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var accommodationPhoto = document.querySelector('.ad-form__photo');
  var fragment = document.createDocumentFragment();

  var similarPhotoTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup__photo');

  var renderAccomodationPhoto = function (readerResult) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.src = readerResult;
    var accommodationPhotoClone = accommodationPhoto.cloneNode(true);
    if (accommodationPhoto) {
      accommodationPhoto.remove();
    }
    window.util.setAttributes(accommodationPhotoClone, {
      'style': 'display:flex; justify-content: center; align-items: center',
    });
    accommodationPhotoClone.appendChild(photoElement);
    fragment.appendChild(accommodationPhotoClone);
    accommodationFormPhotoContainer.appendChild(fragment);
  };

  chooseImg(accommodationImageChooser, renderAccomodationPhoto);

  window.loadPhoto = {
    resetPhotosForm: function () {
      previewAvatar.src = defaultAvatar;
      var accommodationPhotos = accommodationFormPhotoContainer.querySelectorAll('.ad-form__photo');
      accommodationPhotos.forEach(function (element) {
        if ((element.classList.contains('ad-form__photo'))) {
          element.remove();
        }
      });
      accommodationFormPhotoContainer.appendChild(accommodationPhoto);
    },
  };
})();
