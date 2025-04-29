import { CreateCardDto } from "../../dto/dtos";
import db from "../../db/connection";
import { checkExists } from "../../utils";

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

export function removeCard(card_id: number) {
  return checkExists("cards", "card_id", card_id).then(() => {
    return db.query(`DELETE FROM cards WHERE card_id=$1`, [card_id]);
  });
}

export function editCard(
  card_id: number,
  type_of_relationship?: string,
  name?: string,
  timezone?: string,
  date_of_birth?: string,
  date_of_last_contact?: string
) {
  return checkExists("cards", "card_id", card_id).then(() => {
    type Value = string | number;
    const updates: string[] = [];
    const values: Value[] = [];
    let paramIndex = 1;

    if (type_of_relationship !== undefined) {
      updates.push(`type_of_relationship = $${paramIndex++}`);
      values.push(type_of_relationship);
    }

    if (date_of_last_contact !== undefined) {
      updates.push(`date_of_last_contact = $${paramIndex++}`);
      values.push(date_of_last_contact);
    }

    if (name) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }

    if (timezone) {
      updates.push(`timezone = $${paramIndex++}`);
      values.push(timezone);
    }

    if (date_of_birth !== undefined) {
      updates.push(`date_of_birth = $${paramIndex++}`);
      values.push(date_of_birth);
    }

    values.push(card_id);

    const query = `
      UPDATE cards
      SET ${updates.join(", ")}
      WHERE card_id = $${paramIndex}
      RETURNING *;
    `;
    return db.query(query, values).then(({ rows }) => rows[0]);
  });
}
