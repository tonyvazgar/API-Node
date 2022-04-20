const express = require("express");
const router = express.Router();
const customHeader = require("../middlewares/customHeader");
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const { getItems, getItem, createItems, updateItem, deleteItem } = require("../controllers/tracks");
const authMiddleware = require('../middlewares/session');
const checkRol = require('../middlewares/rol');

//TODO http://localhost/tacks GET,POST,DELETE,PUT

/**
 * Lista de los items
 * @openapi
 * /tracks/:
 *      get:
 *          summary: "Get tracks list"
 *          description: "Get the list of the tracks"
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - tracks
 *          responses:
 *              '201':
 *                  description: "Success return tracks list"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/track'
 *              '422':
 *                  description: "Validation error"
 */
router.get('/', authMiddleware, getItems);

/**
 * Lista del item individual
 * @openapi
 * /tracks/{id}:
 *      get:
 *          tags:
 *              - tracks
 *          summary: "Detail of a track"
 *          description: "Obten el detalle de una canción"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - name: id
 *                in: path
 *                description: "ID de canción a retornar"
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: "retorna el objeto de la cancion"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/track"
 *              '422':
 *                  description: "Error de validacion"
 */
router.get('/:id', authMiddleware, validatorGetItem, getItem);

/**
 * Crear un registro de item
 * @openapi
 * /tracks:
 *      post:
 *          tags:
 *              - tracks
 *          summary: "Registro de una nueva canción"
 *          description: "Registro y obtener el detalle de una nueva canción"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: "Retorna el objeto insertado en la colección"
 *              '422':
 *                  description: "Error de validacion"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/track"
 *      responses:
 *          '201':
 *              description: Retorna el objeto insertado en la coleccion con stado '201'
 *          '403':
 *              description: No tiene permisos '403'
 */
router.post('/', authMiddleware, checkRol(['admin']), validatorCreateItem, createItems);

/**
 * Actualizar un registro de item
 * @openapi
 * /tracks/{id}:
 *      put:
 *          tags:
 *              - tracks
 *          summary: "Actualizar track"
 *          description: "Actualiza una cancion y obtener el detalle del registro"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - name: id
 *                in: path
 *                description: "ID de cancion a retornar"
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: Retorna el objeto actualizado en la coleccion.
 *              '422':
 *                  description: Error de validacion.
 *              requestBody:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/track"
 *      responses:
 *          '201':
 *              description: Retorna el objeto insertado en la coleccion con stado '201'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/track'
 *          '403':
 *              description: No tiene permisos '403'
 */
router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
/**
 * Eliminar item individual
 * @openapi
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: "Eliminar cancion"
 *      description: Elimiar el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *        '422':
 *          description: Error de validacion.
 */
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);
module.exports = router;