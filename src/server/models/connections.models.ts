import { connectionObject } from "../../db/dataTypes";
import db from "../../db/connection";
import { CreateConnectionDto } from "../../dto/CreateUserDto";

export function createConnection(connection: CreateConnectionDto){
    const {username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link} = connection; 

    return db.query(
        `INSERT INTO connections(username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link]
    ).then(({rows})=>{
        return rows[0]
    })
}

export function removeConnectionById(connection_id: number){
    return db.query(`DELETE FROM connections WHERE connection_id = $1`, [connection_id]);
  };