// importamos las librerias importantes
const express = require('express');
const cors = require('cors');
const path = require("path");

require('dotenv').config();

// importamos el router
const router = require('./src/routes');

// de express nos traemos lo necesario
const { json, urlencoded } = express;

// creamos nuestra app
const app = express();

// definimos un puerto por el cual escucharemos peticiones
const PORT = process.env.PORT || 4500;
const HOST = process.env.HOST || '0.0.0.0';

// configuraciones para nuestro server
app.use(json());

app.use(urlencoded({ extended: false }));

const corsOptions = { origin: '*', optionsSuccessStatus: 200 };

app.use(cors(corsOptions));

// archivo estáticos
app.use('/', express.static(path.join(__dirname, 'src/public')));

// indicamos que usaremos un router
app.use(router);

// iniciamos nuestro server
app.listen(PORT, HOST, () => { console.log("====> Local Server created in http://localhost:" + PORT + "" + "\n\n"); })