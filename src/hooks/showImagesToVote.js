import { apiUrl } from "../development";

const endpointUrl = apiUrl + '/users/showImagesToVote'; // http://localhost:3001/users/showImagesToVote

const showImagesToVote = async (email, password) => {
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {

    } else { console.error('Error de login'); return { success: false };}

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false };
  }
}

export default showImagesToVote;