"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../src/db/connection"));
const seed_1 = __importDefault(require("../src/db/seeds/seed"));
const data = __importStar(require("../src/db/data/test/index"));
beforeAll(() => (0, seed_1.default)(data));
afterAll(() => connection_1.default.end());
describe("seed", () => {
    describe("users table", () => {
        test("users table exists", () => {
            return connection_1.default
                .query(`SELECT EXISTS (
                      SELECT FROM
                          information_schema.tables
                      WHERE
                          table_name = 'users'
                      );`)
                .then(({ rows: [{ exists }] }) => {
                expect(exists).toBe(true);
            });
        });
        test("users table has username column as the primary key", () => {
            return connection_1.default
                .query(`SELECT column_name
                    FROM information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                    ON tc.constraint_name = kcu.constraint_name
                    WHERE tc.constraint_type = 'PRIMARY KEY'
                    AND tc.table_name = 'users';`)
                .then(({ rows: [{ column_name }] }) => {
                expect(column_name).toBe("username");
            });
        });
        test("users table has first_name column of varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type, column_default
                      FROM information_schema.columns
                      WHERE table_name = 'users'
                      AND column_name = 'first_name';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("first_name");
                expect(column.data_type).toBe("character varying");
            });
        });
        test("users table has last_name column as varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'users'
                        AND column_name = 'last_name';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("last_name");
                expect(column.data_type).toBe("character varying");
            });
        });
        test("users table has timezone column as varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'users'
                        AND column_name = 'timezone';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("timezone");
                expect(column.data_type).toBe("character varying");
            });
        });
        test("users table has date_of_birth column as varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'users'
                        AND column_name = 'date_of_birth';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("date_of_birth");
                expect(column.data_type).toBe("date");
            });
        });
        test("users table has avatar_url column of varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'users'
                        AND column_name = 'avatar_url';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("avatar_url");
                expect(column.data_type).toBe("character varying");
            });
        });
    });
    describe("credentials table", () => {
        test("credentials table exists", () => {
            return connection_1.default
                .query(`SELECT EXISTS (
                      SELECT FROM
                          information_schema.tables
                      WHERE
                          table_name = 'credentials'
                      );`)
                .then(({ rows: [{ exists }] }) => {
                expect(exists).toBe(true);
            });
        });
        test("credentials table has credentials_id column as the primary key", () => {
            return connection_1.default
                .query(`SELECT column_name
                    FROM information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                    ON tc.constraint_name = kcu.constraint_name
                    WHERE tc.constraint_type = 'PRIMARY KEY'
                    AND tc.table_name = 'credentials';`)
                .then(({ rows: [{ column_name }] }) => {
                expect(column_name).toBe("credentials_id");
            });
        });
        test("credentials table has password column of varying caracter", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                      FROM information_schema.columns
                      WHERE table_name = 'credentials'
                      AND column_name = 'password';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("password");
            });
        });
        test("credentials table has username column of varying caracter", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                      FROM information_schema.columns
                      WHERE table_name = 'credentials'
                      AND column_name = 'username';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("username");
            });
        });
    });
    describe("cards table", () => {
        test("cards table exists", () => {
            return connection_1.default
                .query(`SELECT EXISTS (
                      SELECT FROM
                          information_schema.tables
                      WHERE
                          table_name = 'cards'
                      );`)
                .then(({ rows: [{ exists }] }) => {
                expect(exists).toBe(true);
            });
        });
        test("cards table has card_id column as the serial primary key", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type, column_default
                      FROM information_schema.columns
                      WHERE table_name = 'cards'
                      AND column_name = 'card_id';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("card_id");
                expect(column.data_type).toBe("integer");
                expect(column.column_default).toBe("nextval('cards_card_id_seq'::regclass)");
            });
        });
        test("cards table has creator_username column of varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type, column_default
                      FROM information_schema.columns
                      WHERE table_name = 'cards'
                      AND column_name = 'creator_username';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("creator_username");
                expect(column.data_type).toBe("character varying");
            });
        });
        test("cards table has type_of_relationship column as varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'cards'
                        AND column_name = 'type_of_relationship';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("type_of_relationship");
                expect(column.data_type).toBe("character varying");
            });
        });
        test("cards table has name column as varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'cards'
                        AND column_name = 'name';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("name");
                expect(column.data_type).toBe("character varying");
            });
        });
        test("cards table has timezone column as varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'cards'
                        AND column_name = 'timezone';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("timezone");
                expect(column.data_type).toBe("character varying");
            });
        });
        test("cards table has date_of_birth column of date", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'cards'
                        AND column_name = 'date_of_birth';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("date_of_birth");
                expect(column.data_type).toBe("date");
            });
        });
        test("cards table has date_of_last_contact column of timestamp", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'cards'
                        AND column_name = 'date_of_last_contact';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("date_of_last_contact");
                expect(column.data_type).toBe("timestamp without time zone");
            });
        });
    });
    describe("connections table", () => {
        test("connections table exists", () => {
            return connection_1.default
                .query(`SELECT EXISTS (
                      SELECT FROM
                          information_schema.tables
                      WHERE
                          table_name = 'connections'
                      );`)
                .then(({ rows: [{ exists }] }) => {
                expect(exists).toBe(true);
            });
        });
        test("connections table has connection_id column as the primary key", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type, column_default
                      FROM information_schema.columns
                      WHERE table_name = 'connections'
                      AND column_name = 'connection_id';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("connection_id");
                expect(column.data_type).toBe("integer");
                expect(column.column_default).toBe("nextval('connections_connection_id_seq'::regclass)");
            });
        });
        test("connections table has username_1 column of varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type, column_default
                      FROM information_schema.columns
                      WHERE table_name = 'connections'
                      AND column_name = 'username_1';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("username_1");
                expect(column.data_type).toBe("character varying");
            });
        });
        test("connections table has username_2 column of varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type, column_default
                      FROM information_schema.columns
                      WHERE table_name = 'connections'
                      AND column_name = 'username_2';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("username_2");
                expect(column.data_type).toBe("character varying");
            });
        });
        test("connections table has type_of_relationship column as varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'connections'
                        AND column_name = 'type_of_relationship';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("type_of_relationship");
                expect(column.data_type).toBe("character varying");
            });
        });
        test("connections table has date_of_last_contact column of timestamp", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'connections'
                        AND column_name = 'date_of_last_contact';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("date_of_last_contact");
                expect(column.data_type).toBe("timestamp without time zone");
            });
        });
        test("connections table has messaging_link column of varying character", () => {
            return connection_1.default
                .query(`SELECT column_name, data_type
                      FROM information_schema.columns
                      WHERE table_name = 'connections'
                      AND column_name = 'messaging_link';`)
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("messaging_link");
                expect(column.data_type).toBe("character varying");
            });
        });
    });
    describe("data insertion", () => {
        test("users data has been inserted correctly", () => {
            return connection_1.default.query(`SELECT * FROM users;`).then(({ rows: users }) => {
                expect(users).toHaveLength(15);
                users.forEach((user) => {
                    expect(user).toHaveProperty("first_name");
                    expect(user).toHaveProperty("last_name");
                    expect(user).toHaveProperty("username");
                    expect(user).toHaveProperty("timezone");
                    expect(user).toHaveProperty("date_of_birth");
                    expect(user).toHaveProperty("avatar_url");
                });
            });
        });
        test("credentials data has been inserted correctly", () => {
            return connection_1.default
                .query(`SELECT * FROM credentials;`)
                .then(({ rows: credentials }) => {
                expect(credentials).toHaveLength(15);
                credentials.forEach((credential) => {
                    expect(credential).toHaveProperty("username");
                    expect(credential).toHaveProperty("password");
                });
            });
        });
        test("cards data has been inserted correctly", () => {
            return connection_1.default.query(`SELECT * FROM cards;`).then(({ rows: cards }) => {
                expect(cards).toHaveLength(15);
                cards.forEach((card) => {
                    expect(card).toHaveProperty("card_id");
                    expect(card).toHaveProperty("creator_username");
                    expect(card).toHaveProperty("type_of_relationship");
                    expect(card).toHaveProperty("name");
                    expect(card).toHaveProperty("timezone");
                    expect(card).toHaveProperty("date_of_birth");
                    expect(card).toHaveProperty("date_of_last_contact");
                });
            });
        });
        test("connections data has been inserted correctly", () => {
            return connection_1.default
                .query(`SELECT * FROM connections;`)
                .then(({ rows: connections }) => {
                expect(connections).toHaveLength(15);
                connections.forEach((connection) => {
                    expect(connection).toHaveProperty("connection_id");
                    expect(connection).toHaveProperty("username_1");
                    expect(connection).toHaveProperty("username_2");
                    expect(connection).toHaveProperty("type_of_relationship");
                    expect(connection).toHaveProperty("date_of_last_contact");
                    expect(connection).toHaveProperty("messaging_link");
                });
            });
        });
    });
});
