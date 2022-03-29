const uploadMiddleware = require("../utils/handleStorage");
const express = require('express');
const router = express.Router();
const {createItem} = require("../controllers/storage");


router.post('/', uploadMiddleware.single("myfile"), createItem);

module.exports = router;