const express = require("express");
const router = express.Router();
const fs = require('fs')

const PATH_ROUTES = __dirname; //Ruta abosoluta para ver donde está el archivo

//Funcion para quitar la extension de los archivos y asi generar las rutas dinamicas
const removeExtension = (filename) => {
    return filename.split('.').shift();
}


fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);
    if (name !== 'index') {
        console.log(`Cargando ruta ${name}`);
        router.use(`/${name}`, require(`./${file}`))
    }
})


module.exports = router;
