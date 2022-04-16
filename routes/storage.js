const uploadMiddleware = require("../utils/handleStorage");
const express = require('express');
const router = express.Router();
const { createItem, getItems, getItem, updateItem, deleteItem } = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");

/**
 * Subir un archivo
 */
router.post('/', uploadMiddleware.single("myfile"), createItem);

/**
 * Obtener la lista de todos los archivos
 */
router.get("/", getItems);

/**
 * Obtener un archivo
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Actualizar un archivo
 */
router.put("/:id", validatorGetItem, updateItem);

/**
 * Borrar un archivo
 */
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;