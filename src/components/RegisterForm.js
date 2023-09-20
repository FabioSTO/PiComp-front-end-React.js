import '../css/loginForm.css';
import { useState } from 'react';
import registerAccount from '../hooks/registerAccount';
import controlImageChange from '../hooks/controlImageChange';
import controlImageDrop from '../hooks/controlImageDrop';

function RegisterForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleRegisterAccount = (e) => {
    e.preventDefault();
    registerAccount(name, email, password, profilePic); // Por ahora que solo mande el nombre
    console.log(profilePic)
  }

  const handleImageChange = (e) => {
    controlImageChange(e, setProfilePic)
  }

  const handleImageDrop = (e) => {
    controlImageDrop(e, setProfilePic)
  }

  return (
    <form className='form' id='registerForm' onSubmit={handleRegisterAccount}>
      <input type='text' placeholder='EMAIL' className='email' value={email} onChange={e => setEmail(e.target.value)} required/>
      <input type='text' placeholder='PASSWORD' className='PASSWORD' value={password} onChange={e => setPassword(e.target.value)} required/>
      <input type='text' placeholder='NAME' className='name' value={name} onChange={e => setName(e.target.value)} required/>
      <input className='text' id='dragNdrop' type='file' accept='image/*'
        onChange={handleImageChange} onDrop={handleImageDrop} onDragOver={(e) => e.preventDefault()}
      />
      <button className='registerButton' id='createAccount'>CREAR CUENTA</button>
    </form>
  );
};

export default RegisterForm;