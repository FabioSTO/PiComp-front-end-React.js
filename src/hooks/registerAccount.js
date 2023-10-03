import { apiUrl } from "../development";

const endpointUrl = apiUrl + '/users/registerAccount'; // http://localhost:3001/users/registerAccount

const registerAccount = async (name, email, password, profilePic, setRegistered) => {
  try {
    // Crear una promesa para leer la imagen en Base64
    const readImage = () => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(profilePic);
      });
    };

    const profilePicBase64 = await readImage(); // Lee imagen en Base64

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, profilePic: profilePicBase64 })
    });

    if (response.ok) {
      setRegistered(true);
      const result = await response.text();
      console.log(result); // Respuesta del servidor

    } else { console.error('Error al registrar el usuario'); }

  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

export default registerAccount;