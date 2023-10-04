import { apiUrl } from "../development";

const endpointUrl = apiUrl + '/users/sendVotes'; // http://localhost:3001/users/sendVotes

const sendVotes = async () => {
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageRoute, userID })
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.myTop3)
      
      return { success: true, images: result.myTop3}
    } else { console.error('Error al obtener distribución'); return { success: false };}

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false };
  }
}

export default sendVotes;