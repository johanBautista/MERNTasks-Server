// console.log('runr run');
const express = require('express');

//crear el server
const app = express();

//puerto de la app
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('hola tiwi');
});

//encender el server
app.listen(PORT, () => {
  console.log(`el server ${PORT} esta ok`);
});
