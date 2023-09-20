// Controla la subida de imagen al clickar

const controlImageChange = (e, setImage) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); // Para poder mostrar la imagen
    setImage(imageUrl);
  }
}

export default controlImageChange;