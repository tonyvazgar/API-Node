require("dotenv").config()
const express = require("express")
const cors    = require("cors")
const app     = express()
const dbConnect = require("./config/mongo")

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))

const port = process.env.PORT || 5000;

/*
 *  AQUI INVOCAMOS A LAS RUTAS DE TRACKS
 */
//TODO lo que va en LOCALHOST/API/****
app.use('/api', require('./routes/'));


app.listen(port, () => {
        console.log("Corriendo en http://localhost:" + port);
});

dbConnect();