import { apiUrl } from "../development";

const endpointUrl = apiUrl + '/users/submitImage'; // http://localhost:3001/users/submitImage

const submitImage = async (imageName, imageComp, username) => {
  try {
    // Crear una promesa para leer la imagen en Base64
    const readImage = () => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageComp);
      });
    };

    const imageBase64 = await readImage(); // Lee imagen en Base64

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({imageName, imageBase64, username})
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