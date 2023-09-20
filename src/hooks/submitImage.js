import { apiUrl } from "../development";

const endpointUrl = apiUrl + '/users/submitImage'; // http://localhost:3001/users/submitImage

const submitImage = async (imageName, imageComp, username) => {
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({imageName, imageComp, username})
    });

    if (response.ok) {

      const result = await response.text();
      console.log(result); // Respuesta del servidor

    } else { console.error('Error al enviar imagen'); }

  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

export default submitImage;