// Controla la subida de la coronita al DROPEARLA

const controlCrownDrop = (e, setCrowned1, setCrowned2, setCrowned3, crowned1, crowned2, crowned3, crownChosen) => {
  e.preventDefault();
  const id = e.target.getAttribute('id');

  if (crownChosen === "crown1") {   
    if (crowned2.id === id) {               // Pone a null las otras ids que tengan esa corona concreta
      setCrowned2({...crowned2, id: null});
    } if (crowned3.id === id) {
      setCrowned3({...crowned3, id: null});
    }
    setCrowned1({...crowned1, id: id});
  } else if (crownChosen === "crown2") {
    if (crowned1.id === id) {               // Pone a null las otras ids que tengan esa corona concreta
      setCrowned1({...crowned1, id: null});
    } if (crowned3.id === id) {
      setCrowned3({...crowned3, id: null});
    }
    setCrowned2({...crowned2, id: id});
  } else if (crownChosen === "crown3") {
    if (crowned1.id === id) {               // Pone a null las otras ids que tengan esa corona concreta
      setCrowned1({...crowned1, id: null});
    } if (crowned1.id === id) {
      setCrowned1({...crowned1, id: null});
    }
    setCrowned3({...crowned3, id: id});
  }
};

export default controlCrownDrop;