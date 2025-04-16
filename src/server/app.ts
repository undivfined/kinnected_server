import express from "express";

import { deleteConnectionById, postConnection } from "./controllers/connections.controllers";
import { handleCustomErrors, handlePsqlErrors, handleServerErrors } from "./controllers/errors.controllers";
import { getUsers, postUsers } from "./controllers/users.controllers";


const app = express();

app.use(express.json());

app.get("/api/users", getUsers);

app.post("/api/users", postUsers);


app.post("/api/connections", postConnection)

app.delete("/api/connections/:connection_id", deleteConnectionById)

app.use((request, response, next) => {
    response.status(404).send({ message: "path not found" });
})

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

export default app

