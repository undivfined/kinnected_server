import  express  from "express";

import { getUsers, postUser } from "./controllers/users"

const app = express();

app.use(express.json());

app.get("/api/users", getUsers)

app.post("/api/users", postUser)

export default app