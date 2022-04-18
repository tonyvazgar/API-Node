const { matchedData } = require('express-validator');
const { usersModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { encrypt, compare } = require("../utils/handlePassword");
const { signToken, verifyToken } = require("../utils/handleJWT");

/**
 * Ejecucion de Login
 */
const login = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({ email: req.email }).select('password name role email');
        if (!user) {
            handleHttpError(res, "USER_NOT_FOUND", 404);
            return
        }

        const userHash = user.get('password');
        const check = await compare(req.password, userHash);

        if (!check) {
            handleHttpError(res, "EROR_PASSWORD", 402);
            return
        }
        user.set('password', undefined, { stric: false });
        const data = {
            token: await signToken(user),
            user
        };
        res.send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_LOGIN");
    }
};

/**
 * Ejecucion de Register
 */
const register = async (req, res) => {
    try {
        req = matchedData(req);
        const hashPassword = await encrypt(req.password);
        const body = { ...req, password: hashPassword }
        const dataUser = await usersModel.create(body);
        dataUser.set("password", undefined, { strict: false });

        const data = {
            token: await signToken(dataUser),
            user: dataUser
        }

        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER")
    }
};


/**
 * Listado de users
 */
const listadoUsers = async (req, res) => {
    try {
        const data = await usersModel.find({});
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_GET_USERS_LIST");
    }
};

module.exports = { login, register, listadoUsers }