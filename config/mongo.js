const mongoose = require("mongoose");
const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, resp) => {
        if (!err) {
            console.log("** Conexión correcta **")
        } else {

        }
    }
    );
};

module.exports = dbConnect;