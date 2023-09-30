// Controla la subida de imagen al DROPEARLA

const controlImageDrop = (e, setImage, setImageBlob) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); // Para poder mostrar la imagen
    setImageBlob(imageUrl);
    setImage(file);
  }
};

export default controlImageDrop;