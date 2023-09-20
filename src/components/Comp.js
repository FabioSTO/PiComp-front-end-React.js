import { useState } from 'react';
import '../css/comp.css';
import controlImageChange from '../hooks/controlImageChange';
import controlImageDrop from '../hooks/controlImageDrop';
import { useUserContext } from '../context/UserContext';
import submitImage from '../hooks/submitImage';

function Comp() {
  const [name, setName] = useState('');
  const [imageComp, setImage] = useState(null);

  const { username, isLogged, profilePic } = useUserContext();

  const handleImageChange = (e) => {
    controlImageChange(e, setImage);
  };

  const handleImageDrop = (e) => {
    controlImageDrop(e, setImage);
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    submitImage(name, imageComp, username);
  }

  return (
    <div>
      {!isLogged && <form className='compForm' id='compForm' onSubmit={handleImageSubmit}>

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
          <img id='imageComp' src={imageComp} alt='Imagen seleccionada'/>
        </div>
      </>)}

      <input className='boton' id='submit' type='submit' value='NO PULSES'/>

      </form>}

      {isLogged && <div></div> }
      
    </div>
    
  );
}

export default Comp;