const express = require("express");
const router  = express.Router();
const {validatorCreateItem} = require('../validators/tracks');
const {getItems, getItem, createItems} = require("../controllers/tracks");

//TODO http://localhost/tacks GET,POST,DELETE,PUT

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', validatorCreateItem, createItems);

module.exports = router;