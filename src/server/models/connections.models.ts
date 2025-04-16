import db from "../../db/connection";
import { CreateConnectionDto } from "../../dto/dtos";

export function createConnection(connection: CreateConnectionDto) {
  const {
    username_1,
    username_2,
    type_of_relationship,
    date_of_last_contact,
    messaging_link,
  } = connection;

  return db
    .query(
      `INSERT INTO connections(username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        username_1,
        username_2,
        type_of_relationship,
        date_of_last_contact,
        messaging_link,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

export function removeConnectionById(connection_id: number) {
  return db.query(`DELETE FROM connections WHERE connection_id = $1`, [
    connection_id,
  ]);
}


export function updateCommentById(connection_id: number, type_of_relationship: string | undefined, date_of_last_contact: string | undefined) {

  if (type_of_relationship === undefined && date_of_last_contact === undefined) {
    return Promise.reject({status: 400, message: "bad request" });
  }

  if (!type_of_relationship && !date_of_last_contact) {
    return db.query(`SELECT * FROM connections WHERE connection_id = $1`, [connection_id])
    .then(({ rows }) => rows[0]);
  }

  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (type_of_relationship) {
    updates.push(`type_of_relationship = $${paramIndex++}`);
    values.push(type_of_relationship);
  }

  if (date_of_last_contact) {
    updates.push(`date_of_last_contact = $${paramIndex++}`);
    values.push(date_of_last_contact);
  }

  values.push(connection_id);

  const query = `
    UPDATE connections
    SET ${updates.join(", ")}
    WHERE connection_id = $${paramIndex}
    RETURNING *;
  `;
  
  return db.query(query, values).then(({ rows }) => rows[0]);
}