//importamos modulo express
const express = require('express');
//aqui habilitamos en el middleware cors
const cors = require('cors');
//carga variables de entorno
require('dotenv').config();
//aqui definimos puertos a utilizare
const PORT = process.env.PORT || 3000; 

//Obtener las funciones que poseen los callbacks
const { getObtenerjoyas,getObtenerjoyasfiltro,getDefautl} = require('./controllers/componets');

// Instancia de Express para la creación de las rutas
const app = express();
// Habilitar el middleware de CORS para permitir comunicación entre diferentes dominios
app.use(cors());
app.use (express.json());

app.get('/joyas',  getObtenerjoyas);
app.get('/joyas/filtros',  getObtenerjoyasfiltro);
// Ruta para manejar todas las demás rutas no definidas
app.get("*", getDefautl);

app.listen(PORT,()=>{
    console.log(`Servidor de Express escuchando en el puerto ${PORT}`);
});