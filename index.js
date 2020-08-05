console.log('runr run');
const express = require('express');
const conectarDB = require('./config/db');

//crear el server
const app = express();

//conectar a la DB
conectarDB();

//puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));


// app.get('/', (req, res) => {
//   res.send('hola tiwi'); comprueba conexion
//});

//encender el server
app.listen(PORT, () => {
  console.log(`el server ${PORT} esta ok`);
});
