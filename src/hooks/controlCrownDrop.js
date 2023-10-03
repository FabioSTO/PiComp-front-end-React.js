// Controla la subida de la coronita al DROPEARLA

const controlCrownDrop = (e, setCrowned) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    setCrowned(file);
  }
};

export default controlCrownDrop;