const express = require("express");
const { dbConection } = require("./database/config");
const cors = require('cors')
require("dotenv").config();

//console.log(process.env);

//Crear Servidor
const app = express();

//Base de Datos
dbConection();

//CORS
app.use(cors());

//Directorio Público
app.use(express.static("public"));

//Lectura y parseo del Body
app.use(express.json())

//Rutas
app.use("/api/auth", require("./routes/auth"))

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});