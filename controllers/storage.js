const fs = require("fs");
const { matchedData } = require('express-validator');
const {storageModel} = require('../models');
const {handleHttpError} = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_URL  = `${__dirname}/../storage`;

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try{
        // const data = await storageModel.find({});    //Mongo
        const data = await storageModel.findAll();      //Mysql
        res.send({data});
    }catch(error){
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
        const {id} = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({data}); 
    } catch (error) {
        handleHttpError(res, "ERROR_GET_DETAIL_ITEM");
    }
};

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    const {body, file} = req;
    console.log({body, file});
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData);

    res.send({data});
};

/**
 * Borrar un registro logicamente
 * @param {*} req 
 * @param {*} res 
 */
const softDeleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storageModel.delete({_id: id});
        res.send({data})
    } catch (error) {
        handleHttpError(res, "ERROR_SOFT_DELETE_ITEM_STORAGE");
    }
};

/**
 * Borrar un registro de archivo permanenetemente
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.deleteOne(id);

        const {filename} = dataFile;
        const filepath   = `${MEDIA_URL}/${filename}`;
        fs.unlinkSync(filepath);

        const data = {
            filepath,
            deleted: 1
        };

        res.send({data})
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM_STORAGE");
    }
};

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {

};


module.exports = {getItems, getItem, createItem, deleteItem, updateItem};