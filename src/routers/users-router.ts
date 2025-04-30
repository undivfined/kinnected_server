import { Router } from "express";
import {
  deleteUserByUsername,
  getContactsByUsername,
  getCredentialByUsername,
  getUserByUsername,
  getUsers,
  patchUserByUsername,
  postUser,
} from "../server/controllers/users.controllers";

export const usersRouter = Router();

usersRouter.route("/").get(getUsers).post(postUser);
usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .patch(patchUserByUsername)
  .delete(deleteUserByUsername);

usersRouter.get("/:username/credentials", getCredentialByUsername);

usersRouter.get("/:username/contacts", getContactsByUsername);
