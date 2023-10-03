// Controla la subida de la coronita al DROPEARLA
import crown1 from '../img/crown1.png';
import crown2 from '../img/crown2.png';
import crown3 from '../img/crown3.png';

const controlCrownDrop = (e, setCrowned, crownChosen) => {
  e.preventDefault();

  if (crownChosen === "crown1") {
    setCrowned(crown1);
  } else if (crownChosen === "crown2") {
    setCrowned(crown2);
  } else if (crownChosen === "crown3") {
    setCrowned(crown3);
  }
};

export default controlCrownDrop;