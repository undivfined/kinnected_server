"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExists = void 0;
exports.formatFunc = formatFunc;
const pg_format_1 = __importDefault(require("pg-format"));
const connection_1 = __importDefault(require("./db/connection"));
function formatFunc(data) {
    return data.map((item) => Object.values(item));
}
;
const checkExists = (table, column, value) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = (0, pg_format_1.default)("SELECT * FROM %I WHERE %I = $1;", table, column);
    const dbOutput = yield connection_1.default.query(queryStr, [value]);
    if (dbOutput.rows.length === 0) {
        const error = { status: 404, message: "not found" };
        return Promise.reject(error);
    }
});
exports.checkExists = checkExists;
