import {creatrMarkers} from  './map.js';

function getDataFromServer(){
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })

    .then((response) => response.json())
    .then((data) => {
      console.log('Результат', data);
      creatrMarkers(data);
    })
    .catch((error) => {
      console.log(error);
      //вывести сообщение об ошибке?
    });
}

function sendFormData () {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      credentials: 'same-origin',
      body: new FormData(),
    },
  )
    .then((response) => {
      console.log(response.status);
      console.log(response.ok);
      return response.json();
    })
    .then((data) => {
      console.log('Результат', data);
    })
    .catch((err) => {
      console.error(err);
    });
}

export {getDataFromServer, sendFormData};
