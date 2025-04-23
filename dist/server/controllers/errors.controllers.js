"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrors = handleServerErrors;
exports.handlePsqlErrors = handlePsqlErrors;
exports.handleCustomErrors = handleCustomErrors;
function handleServerErrors(error, request, response, next) {
    response.status(500).send({ message: "internal server error" });
}
function handlePsqlErrors(error, request, response, next) {
    const psqlErrors = [
        "22P02",
        "23502",
        "23503",
        "22001",
        "22008",
        "23505",
        "22007",
        "42601",
    ];
    if (psqlErrors.includes(error.code)) {
        response.status(400).send({ message: "bad request" });
    }
    else
        next(error);
}
function handleCustomErrors(error, request, response, next) {
    if (error.status) {
        response.status(error.status).send({ message: error.message });
    }
    else
        next(error);
}
