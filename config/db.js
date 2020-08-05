const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

//conectar con DB
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    //mensaje de ok
    console.log('DB conectada XD ');
  } catch (error) {
    console.log(error);
    process.exit(1); //detiene la app
  }
};

module.exports = conectarDB;
