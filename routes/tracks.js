const express = require("express");
const router  = express.Router();
const customHeader = require("../middlewares/customHeader");
const {validatorCreateItem, validatorGetItem} = require('../validators/tracks');
const {getItems, getItem, createItems, updateItem, deleteItem} = require("../controllers/tracks");

//TODO http://localhost/tacks GET,POST,DELETE,PUT

/**
 * Lista de los items
 */
router.get('/', getItems);
/**
 * Lista del item individual
 */
router.get('/:id', validatorGetItem, getItem);
/**
 * Crear un registro de item
 */
router.post('/', validatorCreateItem, createItems);

/**
 * Actualizar un registro de item
 */
 router.put('/:id', validatorGetItem, validatorCreateItem, updateItem);
 /**
  * Eliminar item individual
  */
 router.delete('/:id', validatorGetItem, deleteItem);
module.exports = router;