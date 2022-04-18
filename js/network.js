let adsArrey;
function getDataFromServer(onSuccess, onError){
  return fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      //onError();
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((data) => {
      //console.log('Результат', data);
      onSuccess(data);
      adsArrey = data;
    })
    .catch(() => {
      onError();//показать сообщение об ошибке (сваять) , если при загрузке данных с сервера произошла ошибка запроса
      //console.log(error);
    });
}

function sendFormData (form, onSuccess, onError) {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      enctype: 'multipart/form-data',
      credentials: 'same-origin',
      body: new FormData(form),
    },
  )
    .then((response) =>
      //console.log(response.status);
      //console.log(response.ok);
      response.json()
    )
    .then((data) => {
      //console.log('Результат', data);
      onSuccess(data);
    })
    .catch((err) => {
      //console.error(err);
      onError(err);
    });
}

export {getDataFromServer, sendFormData, adsArrey};
