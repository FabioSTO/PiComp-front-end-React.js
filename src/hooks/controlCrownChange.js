// Controla la subida de la coronita al clickar

const controlCrownChange = (e, setImage, setImageBlob) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); // Para poder mostrar la imagen
    setImageBlob(imageUrl);
    setImage(file);
  }
}

export default controlCrownChange;