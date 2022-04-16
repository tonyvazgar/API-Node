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
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findById(id);
        res.send({data});
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEM");
    }
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
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.delete({_id:id});
        res.send({data});
    } catch (error) {
        console.log(error)
        handleHttpError(res, "ERROR_Delete_ITEM");
    }
};

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(
            id, body
        );
        res.send({data})
    } catch(e) {
        handleHttpError(res, "ERROR_UPDATE_ITEMS");
    }
};


module.exports = {getItems, getItem, createItems, deleteItem, updateItem};