const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Obtener el token de sesion
 * @param {*} user 
 * @returns 
 */
const signToken = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
    return sign;
};

/**
 * Verificar el token de sesion
 * @param {*} tokenJtw 
 * @returns 
 */
const verifyToken = async (tokenJtw) => {
    try {
        return jwt.verify(tokenJtw, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { signToken, verifyToken };