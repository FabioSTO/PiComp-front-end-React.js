import { apiUrl } from "../development";

const endpointUrl = apiUrl + '/users/registerAccount'; // http://localhost:3001/users/registerAccount

const registerAccount = async (name, email, password, profilePic) => {
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, profilePic})
    });

    if (response.ok) {

      const result = await response.text();
      console.log(result); // Respuesta del servidor

    } else { console.error('Error al registrar el usuario'); }

  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

export default registerAccount;