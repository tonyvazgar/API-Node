const express = require("express");
const router  = express.Router();
const {getItems, getItem, createItems} = require("../controllers/tracks");

//TODO http://localhost/tacks GET,POST,DELETE,PUT

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', createItems);

module.exports = router;