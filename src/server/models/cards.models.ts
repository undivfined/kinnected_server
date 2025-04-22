import { CreateCardDto } from "../../dto/dtos";
import db from "../../db/connection";

export function addCard({
  creator_username,
  type_of_relationship,
  timezone,
  date_of_birth,
  name,
  date_of_last_contact,
}: CreateCardDto) {
  return db
    .query(
      `INSERT INTO cards (creator_username, type_of_relationship,
  timezone, date_of_birth, name, date_of_last_contact) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        creator_username,
        type_of_relationship,
        timezone,
        date_of_birth,
        name,
        date_of_last_contact,
      ]
    )
    .then(({ rows: [card] }) => {
      return card;
    });
}
