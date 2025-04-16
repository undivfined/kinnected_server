"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postConnection = postConnection;
exports.deleteConnectionById = deleteConnectionById;
exports.patchConnectionById = patchConnectionById;
const connections_models_1 = require("../models/connections.models");
const utils_1 = require("../../utils");
function postConnection(request, response, next) {
    const connection = request.body;
    (0, connections_models_1.createConnection)(connection)
        .then((createdConnection) => {
        response.status(201).send({ createdConnection });
    })
        .catch((error) => {
        next(error);
    });
}
function deleteConnectionById(request, response, next) {
    const { connection_id } = request.params;
    (0, utils_1.checkExists)("connections", "connection_id", connection_id)
        .then(() => {
        (0, connections_models_1.removeConnectionById)(connection_id);
    })
        .then(() => {
        response.status(204).send();
    })
        .catch((error) => {
        next(error);
    });
}
function patchConnectionById(request, response, next) {
    const { connection_id } = request.params;
    const { type_of_relationship, date_of_last_contact } = request.body;
    const promises = [(0, connections_models_1.updateCommentById)(connection_id, type_of_relationship, date_of_last_contact)];
    promises.push((0, utils_1.checkExists)("connections", "connection_id", connection_id));
    Promise.all(promises)
        .then(([updatedConnection]) => {
        response.status(200).send({ updatedConnection });
    })
        .catch((error) => {
        next(error);
    });
}
