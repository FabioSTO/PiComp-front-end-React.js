import { apiUrl } from "../development";

const endpointUrl = apiUrl + '/users/showImagesToVote'; // http://localhost:3001/users/showImagesToVote

const showImagesToVote = async () => {
  try {
    const response = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.allImagesDistributed)
      
      return { success: true, images: result.allImagesDistributed}
    } else { console.error('Error al obtener distribución'); return { success: false };}

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false };
  }
}

export default showImagesToVote;