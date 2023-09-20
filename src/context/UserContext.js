// Este archivo es para crear y usar el contexto del LOGIN DEL USUARIO
// para poder usar esta información en toda la app sin andar llevando 
// los datos de un lado para otro

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [profilePic, setProfilePic] = useState(null)

  return (
    <UserContext.Provider value={{ username, setUsername, isLogged, setIsLogged, profilePic, setProfilePic}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);