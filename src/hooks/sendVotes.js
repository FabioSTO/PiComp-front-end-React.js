import { apiUrl } from "../development";

const endpointUrl = apiUrl + '/users/sendVotes'; // http://localhost:3001/users/sendVotes

const sendVotes = async (crowned1, crowned2, crowned3, votedLabels, userTopImages, userID) => {

  const userTopLabels = [];

  votedLabels.forEach((label) => {
    const labelId = label.id;
    if (labelId === crowned1.id) {
      userTopLabels[0] = document.querySelector(`#${labelId}`);
      const label1 = userTopLabels[0].querySelector('#imagesUnderCrown');
      userTopImages[0] = label1.getAttribute('src');
    } else if (labelId === crowned2.id) {
      userTopLabels[1] = document.querySelector(`#${labelId}`);
      const label2 = userTopLabels[1].querySelector('#imagesUnderCrown');
      userTopImages[1] = label2.getAttribute('src');
    } else if (labelId === crowned3.id) {
      userTopLabels[2] = document.querySelector(`#${labelId}`);
      const label3 = userTopLabels[2].querySelector('#imagesUnderCrown');
      userTopImages[2] = label3.getAttribute('src');
    }



  });

  console.log(userTopImages);

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userTopImages, userID })
    });

    if (response.ok) {
      
      return { success: true}
    } else { console.error('Error al insertar votos'); return { success: false };}

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false };
  }
}

export default sendVotes;