"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardsRouter = void 0;
const express_1 = require("express");
const cards_controllers_1 = require("../server/controllers/cards.controllers");
exports.cardsRouter = (0, express_1.Router)();
exports.cardsRouter.post("/", cards_controllers_1.postCard);
exports.cardsRouter.route("/:card_id").patch(cards_controllers_1.patchCard).delete(cards_controllers_1.deleteCard);
