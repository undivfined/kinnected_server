import QueryString from "qs";
import db from "../../db/connection";

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
