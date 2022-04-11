const { matchedData } = require('express-validator');
const {tracksModel} = require('../models');
const {handleHttpError} = require("../utils/handleError");

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
    const data = await tracksModel.find({});
    res.send({data});
    } catch(e) {
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
};

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = (req, res) => {
    res.send("Soy un item!");
};

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItems = async (req, res) => {

    try {
    const body = matchedData(req);
    // console.log(body)
    const data = await tracksModel.create(body)
    res.send({data})
    } catch(e) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
    }
};

/**
 * Borrar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItems = (req, res) => {

};

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItems = (req, res) => {

};


module.exports = {getItems, getItem, createItems, deleteItems, updateItems};