import { connectionObject } from "../../db/dataTypes";
import db from "../../db/connection";
import { NextFunction } from "express";


export function createConnection(connection: connectionObject, next: NextFunction){
    const {username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link} = connection; 

    return db.query(
        `INSERT INTO connections(username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [username_1, username_2, type_of_relationship, date_of_last_contact, messaging_link]
    ).then(({rows})=>{
        return rows[0]
    })
    .catch((error) => {
        next(error);
      });
}