const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatarElement = document.querySelector('.ad-form__field input[type=file]');
const previewAvatarElement = document.querySelector('.ad-form-header__preview img');

const fileChooserAdFotoElement = document.querySelector('.ad-form__upload input[type=file]');
const previewAdFotoElement = document.querySelector('.ad-form__photo');

function addFoto (fileChooser, preview ) {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
}

fileChooserAvatarElement.addEventListener('change', () => {
  addFoto(fileChooserAvatarElement, previewAvatarElement);
});

fileChooserAdFotoElement.addEventListener('change', () => {
  const previewAdFoto = document.createElement('img');
  previewAdFoto.style.maxHeight = '100%';
  addFoto(fileChooserAdFotoElement, previewAdFoto);
  previewAdFotoElement.append(previewAdFoto);
});
