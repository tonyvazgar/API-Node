const express = require("express");
const router = express.Router();
const { validatorLogin, validatorRegister } = require('../validators/auth');
const { login, register, listadoUsers } = require("../controllers/auth");
const checkRol = require('../middlewares/rol');
const authMiddleware = require("../middlewares/session");

/**
 * Post Login
 * @openapi
 * /auth/login:
 *      post:
 *          summary: "Login user"
 *          description: "Action login of a user with password and mail."
 *          requestBody:
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authLogin"
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          tags:
 *              - auth
 *          responses:
 *              '201':
 *                  description: "Login was successful."
 *              '403':
 *                  description: "There was a problem."
 */
router.post("/login", validatorLogin, login);


/**
 * Post Register
 * @openapi
 * /auth/register:
 *      post:
 *          summary: "Register a user."
 *          description: "This route is to register a new user."
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *                          properties:
 *                              name:
 *                                  type: string
 *                              age:
 *                                  type: integer
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          tags:
 *              - auth
 *          responses:
 *              '201':
 *                  description: "User was registed successful."
 *              '403': 
 *                  description: "An error ocurred :("
 */
router.post("/register", validatorRegister, register);


/**
 * Get List Users
 */
router.get('/list', authMiddleware, checkRol(['admin']), listadoUsers);

module.exports = router;