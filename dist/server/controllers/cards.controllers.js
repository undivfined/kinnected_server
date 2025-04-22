"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCard = postCard;
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
