const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJWT');
const { usersModel } = require('../models');

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_JWT", 401);
            return
        }
        const token = req.headers.authorization.split(' ').pop();
        const data_token = await verifyToken(token);
        if (!data_token._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return
        }
        const user = await usersModel.findById(data_token._id);
        req.user = user;

        next();
    } catch (error) {
        handleHttpError(res, "ERROR_SESSION", 401);
    }
}

module.exports = authMiddleware;