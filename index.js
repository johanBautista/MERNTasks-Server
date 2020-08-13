console.log('runr run');
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crear el server
const app = express();

//conectar a la DB
conectarDB();

//habilitar cors
app.use(cors());

//habilitar express.json leer data
app.use(express.json({ extended: true }));

//puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//encender el server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`el server ${PORT} esta ok, xD`);
});
