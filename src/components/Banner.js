import style from '../css/banner.css'
import anonymous from '../img/anonymous.jpg'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

function Banner() {

  const { username, isLogged, profilePic } = useUserContext();

  const navigate = useNavigate();
  
  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='Banner' style={style}>
      <div className='title'> PiComp </div>
      {isLogged && <div className='username'>{username}</div>}
      {isLogged ? (
        <img className='logo' src={profilePic} onClick={navigateToLogin} alt='Foto de perfil' />
      ) : (
        <img className='logo' src={anonymous} onClick={navigateToLogin} alt='Foto de perfil sin registrarse' />
      )}
    </div>
    
  );
}

export default Banner;