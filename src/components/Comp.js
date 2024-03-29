import { useState } from 'react';
import '../css/comp.css';
import controlImageChange from '../hooks/controlImageChange';
import controlImageDrop from '../hooks/controlImageDrop';
import controlCrownDrop from '../hooks/controlCrownDrop';
import { useUserContext } from '../context/UserContext';
import submitImage from '../hooks/submitImage';
import showImagesToVote from '../hooks/showImagesToVote';
import sendVotes from '../hooks/sendVotes';
import crownOff from '../img/crownOff.png'
import crown1 from '../img/crown1.png';
import crown2 from '../img/crown2.png';
import crown3 from '../img/crown3.png';


function Comp() {
  const [name, setName] = useState('');
  const [imageComp, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [showVote, setShowVote] = useState(false); // Mostrar fotos para votar
  const [showFullScreenImage, setShowFullScreenImage] = useState(false); // Para hacer grande la foto que pulsas
  const [selectedImage, setSelectedImage] = useState(null); // Para hacer grande la foto que pulsas
  const [crownChosen, setCrownChosen] = useState(null); // Para especificar la corona que se selecciona
  const [crowned1, setCrowned1] = useState({ src: crown1, id: null}); // PROBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS
  const [crowned2, setCrowned2] = useState({ src: crown2, id: null}); // PROBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS
  const [crowned3, setCrowned3] = useState({ src: crown3, id: null}); // PROBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS
  const [loaded, setLoaded] = useState(null);
  const [userImages, setUserImages] = useState(null);  // Imagenes a votar
  const [userTopImages, setUserTopImages] = useState(['userTop1', 'userTop2', 'userTop3']);

  const { id, username, isLogged, profilePic, email, setSubmitted, submitted, voted, setVoted } = useUserContext();

  const handleImageChange = (e) => {
    controlImageChange(e, setImage, setImageBlob);
  };

  const handleImageDrop = (e) => {
    controlImageDrop(e, setImage, setImageBlob);
    
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    submitImage(name, imageComp, username);
    setSubmitted(true);
  }

  const handleCrownDrop = (e) => {  // Para soltar la coronita y marcarlo
    controlCrownDrop(e, setCrowned1, setCrowned2, setCrowned3, crowned1, crowned2, crowned3, crownChosen);

  };

  const handleCrownClickOrStartDrag = (e) => {           // Maneja la corona escogida y guarda su nombre en crownChosen
    setCrownChosen(e.target.getAttribute('id'));
  }

  const handleMouseEnterCrownOff = () => {           // Activa el eventListener cuando el ratón está sobre la corona
    if (loaded) {
      const crownLabels = document.querySelectorAll('.crownLabel');
      const crownGolds = document.querySelectorAll('.crownGold');

      crownLabels.forEach((crownLabel) => {
        crownLabel.addEventListener('click', () => {
          const img = crownLabel.querySelector('img');
          crownGolds.forEach((crownGold) => {
            crownGold.classList.toggle('highlighted');
          });
        });
      });
    }

    setLoaded(false);
  }

  const handleChangeOrientation = (e) => {           // Cambia orientación de las imágenes
    e.preventDefault();

    const imageLine = document.querySelector('.Vote .crownOff-container');

    imageLine.classList.toggle('column');

  }

  const handleImageClick = (image) => { // Para hacer grande la foto al pulsarla
    setSelectedImage(image);
    setShowFullScreenImage(true);
  };

  const handleIsCrowned = (crown_X) => {
    if (crown_X === crowned1.id) {
      return crowned1.src;
    } if (crown_X === crowned2.id) {
      return crowned2.src;
    } if (crown_X === crowned3.id) {
      return crowned3.src;
    }
    
    return crownOff;
  }

  const handleShowImagesToVote = async (e) => {
    e.preventDefault();
    try {
      const result = await showImagesToVote();
      const userImagesPairs = result.images; // Todos los pares
      const userImagesTemp = userImagesPairs.filter(item => item.usuario === id); // Los pares del usuario logueado
      console.log(userImagesTemp);
      setUserImages(userImagesTemp);
    } catch (error) {
      console.error('Error al obtener imágenes para votar:', error);
    }
    setShowVote(true);
    setLoaded(true);

  };

  const handleSendVotes = (e) => {
    e.preventDefault();

    const votedLabels = document.querySelectorAll('.crownLabel');

    const success = sendVotes(crowned1, crowned2, crowned3, votedLabels, userTopImages, id);

    if (success) { setVoted(true); };

  }

  const handleTestRecuento = (e) => {
    e.preventDefault();

    
  }


  return (
    <div>

      {/* LOGUEADO / NO SUBMITTED / VOTED */}

      {isLogged && !submitted && <form className='compForm' id='compForm' onSubmit={handleImageSubmit}>

        <label className='text'> Nombre de la foto:
          <input className='textInput'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        {!imageComp && <input className='text' id='dragNdrop' type='file' accept='image/*'
          onChange={handleImageChange} onDrop={handleImageDrop} onDragOver={(e) => e.preventDefault()}
        />}

        {name !== '' && <p className='text'>{name}</p>}

        {imageComp && (<>
          <button className='boton' onClick={() => setImage(null)} >Cambiar imagen</button>
          <div className='imgContainer'>
            <img id='imageComp' src={imageBlob} alt='Imagen seleccionada'/>
          </div>
        </>)}

        <input className='boton' id='submit' type='submit' value='NO PULSES'/>

      </form>}

      {/* LOGUEADO / SUBMITTED / NO VOTED */}

      {isLogged && submitted && !voted && <form className='compForm' id='compForm'>
        <h1 className='title-text'> Comienza a votar cuando quieras </h1>
        <button className='changeOrientation' onClick={handleChangeOrientation} >CAMBIAR ORIENTACIÓN</button>
        <button className='boton' onClick={handleShowImagesToVote} >VOTAR</button>

        
        {showVote && <div className='Vote' onMouseOver={handleMouseEnterCrownOff} onTouchStart={handleMouseEnterCrownOff}>
        <div className='crownN-container'>
            <div id='crown2'>
                <img className='crownGold' onDragStart={handleCrownClickOrStartDrag} onClick={handleCrownClickOrStartDrag} id='crown2' src={crown2} alt='crown2'/>
            </div>
            <div id='crown1'>
                <img className='crownGold' onDragStart={handleCrownClickOrStartDrag} onClick={handleCrownClickOrStartDrag} id='crown1' src={crown1} alt='crown1'/>
            </div>
            <div id='crown3'>
                <img className='crownGold' onDragStart={handleCrownClickOrStartDrag} onClick={handleCrownClickOrStartDrag} id='crown3' src={crown3} alt='crown3'/>
            </div>
          </div>

          <div className='crownOff-container'>
            {userImages.map((image, index) => (
              <div id='crownOff' key={index}>
                <label id={`crown_${index}`} htmlFor="crownOffabel" className='crownLabel' onClick={(e) => e.preventDefault()} onDrop={handleCrownDrop} onDragOver={(e) => e.preventDefault()}>         
                  <img className="coronitaGris" id={`crown_${index}`} src={handleIsCrowned(`crown_${index}`)} alt='crown'/>
                  <img id="imagesUnderCrown" src={image.imagen} alt={`Imagen ${index}`} onClick={() => handleImageClick(image.imagen)}/>
                </label>
                
                <input className='text' id='crownOffabel' type='file' accept='image/*' onClick={(e) => e.preventDefault()} onDrop={handleCrownDrop} onDragOver={(e) => e.preventDefault()}/>     {/* OCULTAR EL INPUT PERO DEJAR EL LABEL PARA DROPEAR LA CORONA */}
              </div>
            ))}
          </div>

          <button className='boton' onClick={handleSendVotes} >ENVIAR VOTACIONES</button>
        </div>   } 

        

              {/* PARA SALIR DE LA FOTO EN PANTALLA COMPLETA */}

        {showFullScreenImage && <div className="full-screen-image">
          <img
            src={selectedImage}
            alt="Imagen pantalla completa"
            onClick={() => setShowFullScreenImage(false)}
        /></div>}



      </form> }

      {/* LOGUEADO / SUBMITTED / VOTED */}

      {isLogged && submitted && voted && <form className='compForm' id='compForm' onSubmit={handleTestRecuento}>
        <h1 className='title-text'> Espera a que acaben las votaciones </h1>

        <input className='boton' id='submit' type='submit' value='PRUEBA DE CÁLCULO DE VOTOS'/>
        
      </form> }

      {/* NO LOGUEADO */}

      {!isLogged && <form className='compForm' id='compForm'>
        <h1 className='title-text'> Inicia sesión para participar </h1>
        
      </form> }
      
    </div>
    
  );
}

export default Comp;


{/*

<div className='crownOff-container'>
            <div id='crownOff'>
                <label id='crown_1' htmlFor="crownOffabel" className='crownLabel' onClick={(e) => e.preventDefault()} onDrop={handleCrownDrop} onDragOver={(e) => e.preventDefault()}>         
                  <img id='crown_1' src={handleIsCrowned('crown_1')} alt='crown'/>
                </label>
                <img src={top2} alt='top2' onClick={() => handleImageClick(top2)}/>
                <input className='text' id='crownOffabel' type='file' accept='image/*' onClick={(e) => e.preventDefault()} onDrop={handleCrownDrop} onDragOver={(e) => e.preventDefault()}/>     
            </div>
            <div id='crownOff'>
                <label id='crown_2' htmlFor="crownOffabel" className='crownLabel' onClick={(e) => e.preventDefault()} onDrop={handleCrownDrop} onDragOver={(e) => e.preventDefault()}>       
                  <img className='crown' id='crown_2' src={handleIsCrowned('crown_2')} alt='crown'/>
                </label>
                <img src={top1} alt='top1' onClick={() => handleImageClick(top1)}/>
                <input className='text' id='crownOffabel' type='file' accept='image/*' onClick={(e) => e.preventDefault()} onDrop={handleCrownDrop} onDragOver={(e) => e.preventDefault()}/>     
            </div>
            <div id='crownOff'>
                <label id='crown_3' htmlFor="crownOffabel" className='crownLabel' onClick={(e) => e.preventDefault()} onDrop={handleCrownDrop} onDragOver={(e) => e.preventDefault()}>       
                  <img className='crown' id='crown_3' src={handleIsCrowned('crown_3')} alt='crown'/>
                </label>
                <img src={top3} alt='top3' onClick={() => handleImageClick(top3)}/>
                <input className='text' id='crownOffabel' type='file' accept='image/*' onClick={(e) => e.preventDefault()} onDrop={handleCrownDrop} onDragOver={(e) => e.preventDefault()}/>     
            </div>
          </div>

*/}