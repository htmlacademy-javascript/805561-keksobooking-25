const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

const fileChooserAdFoto = document.querySelector('.ad-form__upload input[type=file]');
const previewAdFotoContainer = document.querySelector('.ad-form__photo');

function addFoto (fileChooser, preview ) {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
}

fileChooserAvatar.addEventListener('change', () => {
  addFoto(fileChooserAvatar, previewAvatar);
});

fileChooserAdFoto.addEventListener('change', () => {
  const previewAdFoto = document.createElement('img');
  previewAdFoto.style.maxHeight = '100%';
  addFoto(fileChooserAdFoto, previewAdFoto);
  previewAdFotoContainer.append(previewAdFoto);
});
