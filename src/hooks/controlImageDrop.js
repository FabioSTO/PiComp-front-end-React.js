// Controla la subida de imagen al DROPEARLA

const controlImageDrop = (e, setImage) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  }
};

export default controlImageDrop;