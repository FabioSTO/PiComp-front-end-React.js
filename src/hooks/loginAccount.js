import { apiUrl } from "../development";

const endpointUrl = apiUrl + '/users/loginAccount'; // http://localhost:3001/users/loginAccount

const loginAccount = async (email, password) => {
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password})
    });

    if (response.ok) {

      const result = await response.json();
      console.log(result.message); 
      console.log(result.username);
      return { success: true, username: result.username, profilePic: result.profilePic, 
        email: result.email, submitted: result.submitted, voted: result.voted};

    } else { console.error('Error de login'); return { success: false };}

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false };
  }
}

export default loginAccount;