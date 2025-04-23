"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCard = postCard;
exports.deleteCard = deleteCard;
exports.patchCard = patchCard;
const cards_models_1 = require("../models/cards.models");
function postCard(request, response, next) {
    const { creator_username, type_of_relationship, timezone, date_of_birth, name, date_of_last_contact, } = request.body;
    (0, cards_models_1.addCard)({
        creator_username,
        type_of_relationship,
        timezone,
        date_of_birth,
        name,
        date_of_last_contact,
    })
        .then((card) => {
        response.status(201).send({ card });
    })
        .catch((error) => {
        next(error);
    });
}
function deleteCard(request, response, next) {
    const { card_id } = request.params;
    (0, cards_models_1.removeCard)(card_id)
        .then(() => {
        response.status(204).end();
    })
        .catch((error) => {
        next(error);
    });
}
function patchCard(request, response, next) {
    const { card_id } = request.params;
    const { type_of_relationship, name, timezone, date_of_birth, date_of_last_contact, } = request.body;
    (0, cards_models_1.editCard)(card_id, type_of_relationship, name, timezone, date_of_birth, date_of_last_contact)
        .then((card) => {
        response.status(200).send({ card });
    })
        .catch((error) => {
        next(error);
    });
}
