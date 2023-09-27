import '../css/loginForm.css';
import { useState } from 'react';
import RegisterForm from './RegisterForm';
import loginAccount from '../hooks/loginAccount';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

function LoginForm() {

  const [email, setEmailToReg] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { setUsername, setIsLogged, setProfilePic, 
    setEmail, setSubmitted, setVoted } = useUserContext();

  const navigate = useNavigate();
  
  const navigateToHome = () => {
    navigate('*');
  };

  const handleShowRegister = (e) => { // Muestra ventana de registro
    e.preventDefault();
    setShowRegister(!showRegister);
    setIsButtonDisabled(true);
  }

  const handleLoginAccount = async (e) => { // Controla el loginAccount
    e.preventDefault();
    const loginResult = await loginAccount(email, password);
    if (loginResult.success) {
      setUsername(loginResult.username); 
      setIsLogged(loginResult.success);
      setProfilePic(loginResult.profilePic);
      setEmail(loginResult.email);
      setSubmitted(loginResult.submitted);
      setVoted(loginResult.voted);
      
      navigateToHome();
    };
  }

  return (
    <div className='formContainer'>
      <div className='login'>
        <h1 className='loginTitle'>INICIAR SESIÓN</h1>
        <form className='form' id='loginForm' onSubmit={handleLoginAccount}>
          <input type='text' placeholder='EMAIL' className='email' value={email} onChange={e => setEmailToReg(e.target.value)} required/>
          <input type='text' placeholder='PASSWORD' className='PASSWORD' value={password} onChange={e => setPassword(e.target.value)} required/>
          <button className='registerButton' id='loginAccount'>LOGIN</button>
        </form>
      </div>
      <div className='register'>
        <h1 className='loginTitle'>¿AÚN NO TIENES CUENTA?</h1>
        <button className='registerButton' onClick={handleShowRegister} disabled={isButtonDisabled}>REGÍSTRATE</button>
        {showRegister && <RegisterForm />}
      </div>
    </div>
  );
};


export default LoginForm;