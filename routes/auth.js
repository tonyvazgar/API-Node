const express = require("express");
const router = express.Router();
const { validatorLogin, validatorRegister } = require('../validators/auth');
const { login, register, listadoUsers } = require("../controllers/auth");
const checkRol = require('../middlewares/rol');
const authMiddleware = require("../middlewares/session");

/**
 * Post Login
 */
router.post("/login", validatorLogin, login);


/**
 * Post Register
 */
router.post("/register", validatorRegister, register);


/**
 * Get List Users
 */
router.get('/list', authMiddleware, checkRol(['admin']), listadoUsers);

module.exports = router;