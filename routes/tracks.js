const express = require("express");
const router = express.Router();
const customHeader = require("../middlewares/customHeader");
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const { getItems, getItem, createItems, updateItem, deleteItem } = require("../controllers/tracks");
const authMiddleware = require('../middlewares/session');
const checkRol = require('../middlewares/rol');

//TODO http://localhost/tacks GET,POST,DELETE,PUT

/**
 * Lista de los items
 */
router.get('/', authMiddleware, getItems);
/**
 * Lista del item individual
 */
router.get('/:id', authMiddleware, validatorGetItem, getItem);
/**
 * Crear un registro de item
 */
router.post('/', authMiddleware, checkRol(['admin']), validatorCreateItem, createItems);

/**
 * Actualizar un registro de item
 */
router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
/**
 * Eliminar item individual
 */
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);
module.exports = router;