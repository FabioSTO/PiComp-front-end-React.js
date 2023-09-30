import { useState } from 'react';
import '../css/comp.css';
import controlImageChange from '../hooks/controlImageChange';
import controlImageDrop from '../hooks/controlImageDrop';
import { useUserContext } from '../context/UserContext';
import submitImage from '../hooks/submitImage';
import showImagesToVote from '../hooks/showImagesToVote';

function Comp() {
  const [name, setName] = useState('');
  const [imageComp, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  const { username, isLogged, profilePic, email, setSubmitted, submitted, voted } = useUserContext();

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

  const handleShowImagesToVote = (e) => {
    showImagesToVote();
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
        
      </form> }

      {/* LOGUEADO / SUBMITTED / VOTED */}

      {!isLogged && submitted && voted && <form className='compForm' id='compForm'>
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