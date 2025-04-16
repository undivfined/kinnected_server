import QueryString from "qs";
import db from "../../db/connection";
import { CreateUserDto } from "../../dto/dtos";

export function fetchUsers(
  search:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined
) {
  let sqlString = `WITH full_name_table as (SELECT *, first_name || last_name as full_name FROM users)
                    SELECT first_name, last_name, username, timezone, date_of_birth, avatar_url FROM full_name_table`;
  const queryValues = [];
  if (search) {
    sqlString += ` WHERE full_name ILIKE $1`;
    queryValues.push(`%${search}%`);
  }
  return db.query(sqlString, queryValues).then(({ rows }) => {
    return rows.map((row) => {
      return { ...row, avatar_url: row.avatar_url ? row.avatar_url : "" };
    });
  });
}

export function addUser(newUser: CreateUserDto) {
  const {
    username,
    first_name,
    last_name,
    timezone,
    date_of_birth,
    avatar_url,
    password,
  } = newUser;
  if (!password) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({ rows }) => {
      if (rows.length !== 0) {
        return Promise.reject({
          status: 400,
          message: "A user with this username already exists",
        });
      } else {
        return db.query(
          `INSERT INTO users (username, first_name, last_name, timezone, date_of_birth,
        avatar_url) VALUES ($1, $2, $3, $4, $5, $6)`,
          [username, first_name, last_name, timezone, date_of_birth, avatar_url]
        );
      }
    })
    .then(() => {
      return db.query(
        `INSERT INTO credentials (username, password) VALUES ($1, $2)`,
        [username, password]
      );
    })
    .then(() => {
      return db.query(
        `SELECT users.*, credentials.password FROM users JOIN credentials
      ON users.username=credentials.username WHERE users.username=$1`,
        [username]
      );
    })
    .then(({ rows: [user] }) => {
      if (!user.password) {
        return db
          .query(`DELETE FROM users WHERE username = $1`, [username])
          .then(() => {
            // Aware that this is a nested then-block but cannot figure out another way to make sure both deleting
            // and rejecting the promise happen if the condition is met. This is a check for the unlikely case when
            // something happened in between the username being saved in users and the password being saved in passwords,
            // as we do not want users in users that do not have passwords.
            return Promise.reject({
              status: 500,
              message: "Something went wrong, please try again later",
            });
          });
      }

      if (user.password) {
        return user;
      }
    });
}
