import { NextFunction, Request, Response } from "express";

import {
  addUser,
  fetchCredentialByUsername,
  fetchUsers,
  fetchContactsByUsername,
  fetchUserByUsername,
  removeUserByUsername,
  editUser,
} from "../models/users.models";

import { ChangeUserDto, CreateUserDto } from "../../dto/dtos";

export function getUsers(request: Request, response: Response) {
  const { search } = request.query;

  fetchUsers(search).then((users) => {
    response.status(200).send({ users });
  });
}

export function postUser(
  request: Request<{}, {}, CreateUserDto>,
  response: Response,
  next: NextFunction
) {
  const {
    username,
    first_name,
    last_name,
    timezone,
    date_of_birth,
    avatar_url,
    password,
  } = request.body;

  addUser({
    username,
    first_name,
    last_name,
    timezone,
    date_of_birth,
    avatar_url,
    password,
  })
    .then((user) => {
      response.status(201).send({ user });
    })
    .catch((error) => {
      next(error);
    });
}

export function getUserByUsername(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { username } = request.params;
  fetchUserByUsername(username)
    .then((user) => {
      response.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
}

export function getCredentialByUsername(
  request: Request<{ username: string }>,
  response: Response,
  next: NextFunction
) {
  const { username } = request.params;
  fetchCredentialByUsername(username)
    .then((credential) => {
      response.status(200).send({ credential });
    })
    .catch((error) => {
      next(error);
    });
}

export function getContactsByUsername(
  request: Request<{ username: string }>,
  response: Response,
  next: NextFunction
) {
  const { username } = request.params;
  fetchContactsByUsername(username)
    .then((contacts) => {
      response.status(200).send({ contacts });
    })
    .catch((error) => {
      next(error);
    });
}

export function deleteUserByUsername(
  request: Request<{ username: string }>,
  response: Response,
  next: NextFunction
) {
  const { username } = request.params;
  removeUserByUsername(username)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
}

export function patchUserByUsername(
  request: Request<{ username: string }, {}, ChangeUserDto>,
  response: Response,
  next: NextFunction
) {
  const { username } = request.params;
  const { first_name, last_name, date_of_birth, timezone, avatar_url } =
    request.body;

  editUser(username, first_name, last_name, date_of_birth, timezone, avatar_url)
    .then((user) => {
      response.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
}
