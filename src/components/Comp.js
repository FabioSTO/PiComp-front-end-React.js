import { useState } from 'react';
import '../css/comp.css';
import controlImageChange from '../hooks/controlImageChange';
import controlImageDrop from '../hooks/controlImageDrop';
import { useUserContext } from '../context/UserContext';
import submitImage from '../hooks/submitImage';
import showImagesToVote from '../hooks/showImagesToVote';


import top2 from '../img/foto1.jpg'; // TEMPORAAALALALALALALAL
import top1 from '../img/top1.jpg';  
import top3 from '../img/foto2.jpg';

function Comp() {
  const [name, setName] = useState('');
  const [imageComp, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [showVote, setShowVote] = useState(false); // Mostrar fotos para votar
  const [showFullScreenImage, setShowFullScreenImage] = useState(false); // Para hacer grande la foto que pulsas
  const [selectedImage, setSelectedImage] = useState(null); // Para hacer grande la foto que pulsas

  const { id, username, isLogged, profilePic, email, setSubmitted, submitted, voted } = useUserContext();

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

  const handleImageClick = (image) => { // Para hacer grande la foto al pulsarla
    setSelectedImage(image);
    setShowFullScreenImage(true);
  };

  const handleShowImagesToVote = async (e) => {
    e.preventDefault();
    try {
      const result = await showImagesToVote();
      const userImagesPairs = result.images; // Todos los pares
      const userImages = userImagesPairs.filter(item => item.usuario === id); // Los pares del usuario logueado
      console.log(userImages);
    } catch (error) {
      console.error('Error al obtener imágenes para votar:', error);
    }
    setShowVote(true);

  };


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
        <button className='boton' onClick={handleShowImagesToVote} >VOTAR</button>
        
        {showVote && <div className='Vote'>
          <div className='img-container'>
          <div id='top2'>
              <h1 className='VoteText'>TOP 2</h1>
              <img src={top2} alt='top2' onClick={() => handleImageClick(top2)}/>
          </div>
          <div id='top1'>
              <h1 className='VoteText'>TOP 1</h1>
              <img src={top1} alt='top1'/>
          </div>
          <div id='top3'>
              <h1 className='VoteText'>TOP 3</h1>
              <img src={top3} alt='top3'/>
          </div>
          </div>
        </div>}

              {/* PARA SALIR DE LA FOTO EN PANTALLA COMPLETA */}

        {showFullScreenImage && <div className="full-screen-image">
          <img
            src={selectedImage}
            alt="Imagen pantalla completa"
            onClick={() => setShowFullScreenImage(false)}
        /></div>}



      </form> }

      {/* LOGUEADO / SUBMITTED / VOTED */}

      {isLogged && submitted && voted && <form className='compForm' id='compForm'>
        <h1 className='title-text'> Espera a que acaben las votaciones </h1>
        
      </form> }

      {/* NO LOGUEADO */}

      {!isLogged && <form className='compForm' id='compForm'>
        <h1 className='title-text'> Inicia sesión para participar </h1>
        
      </form> }
      
    </div>
    
  );
}

export default Comp;