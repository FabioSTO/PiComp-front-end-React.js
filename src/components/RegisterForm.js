import '../css/loginForm.css';
import { useState } from 'react';
import registerAccount from '../hooks/registerAccount';
import controlImageChange from '../hooks/controlImageChange';
import controlImageDrop from '../hooks/controlImageDrop';
import { useUserContext } from '../context/UserContext';

function RegisterForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [imageBlob, setImageBlob] = useState(null); // Para mostrar imagen

  const { isLogged } = useUserContext();

  const handleRegisterAccount = (e) => {
    e.preventDefault();
    registerAccount(name, email, password, profilePic);
    setRegistered(true);
  }

  const handleImageChange = (e) => {
    controlImageChange(e, setProfilePic, setImageBlob);
  }

  const handleImageDrop = (e) => {
    controlImageDrop(e, setProfilePic, setImageBlob);
  }

  return (
    <div>

      {/* Aún no se registró */}
      {!registered && !isLogged && <form className='form' id='registerForm' onSubmit={handleRegisterAccount}>
        <input type='text' placeholder='EMAIL' className='email' value={email} onChange={e => setEmail(e.target.value)} required/>
        <input type='text' placeholder='PASSWORD' className='PASSWORD' value={password} onChange={e => setPassword(e.target.value)} required/>
        <input type='text' placeholder='NAME' className='name' value={name} onChange={e => setName(e.target.value)} required/>
        <input className='text' id='dragNdrop' type='file' accept='image/*'
          onChange={handleImageChange} onDrop={handleImageDrop} onDragOver={(e) => e.preventDefault()}
        />
        <button className='registerButton' id='createAccount'>CREAR CUENTA</button>
      </form>}

      {/* Se acaba de registrar */}
      {(registered || isLogged) && <h1 className='title-text'> CUENTA CREADA, INICIA SESIÓN PARA COMENZAR </h1>}
    </div>
    
  );
};

export default RegisterForm;