const express = require("express");
const router = express.Router();
const { validatorLogin, validatorRegister } = require('../validators/auth');
const { login, register, listadoUsers } = require("../controllers/auth");

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
router.get('/list', listadoUsers);

module.exports = router;