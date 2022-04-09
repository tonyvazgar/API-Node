const express = require("express");
const router  = express.Router();
const customHeader = require("../middlewares/customHeader");
const {validatorCreateItem} = require('../validators/tracks');
const {getItems, getItem, createItems} = require("../controllers/tracks");

//TODO http://localhost/tacks GET,POST,DELETE,PUT

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', validatorCreateItem, customHeader, createItems);

module.exports = router;