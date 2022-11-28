const axios = require('axios'); 

axios.get('https://thronesapi.com/api/v2/Characters/'+personajeID)
.then(function (response){
    console.log(response.data);
  })
  .catch(function (error){
      console.log(error);
  });