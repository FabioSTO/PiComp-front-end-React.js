// Controla la subida de imagen al clickar

const controlImageChange = (e, setImage, setImageBlob) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); // Para poder mostrar la imagen
    setImageBlob(imageUrl);
    setImage(file);
  }
}

export default controlImageChange;