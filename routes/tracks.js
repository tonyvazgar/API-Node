const express = require("express");
const router  = express.Router();

//TODO http://localhost/tacks GET,POST,DELETE,PUT

router.get('/', (req, res) => {
    const data = ["Holaa", "Mundooo"];

    res.send({data});
});

module.exports = router;