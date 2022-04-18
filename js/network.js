function getDataFromServer(onSuccess, onError){
  return fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
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
      response.json()
    )
    .then((data) => {
      onSuccess(data);
      console.log(data);
    })
    .catch((err) => {
      onError(err);
    });
}

export {getDataFromServer, sendFormData };
