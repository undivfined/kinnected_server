import { Users, Cards, Connections, Credentials } from "./db/dataTypes";
import format from "pg-format";
import db from "./db/connection";

export function formatFunc(data: Users | Cards | Connections | Credentials ) {
    return data.map((item) => Object.values(item));
  };


  interface NotFoundError {
      status: number;
      message: string;
    }
  
  export const checkExists = async (
    table: string,
    column: string,
    value: string | number
  ): Promise<void> => {
    const queryStr = format("SELECT * FROM %I WHERE %I = $1;", table, column);
    const dbOutput = await db.query(queryStr, [value]);
  
    if (dbOutput.rows.length === 0) {
      const error: NotFoundError = { status: 404, message: "not found" };
      return Promise.reject(error);
    }
  };
  