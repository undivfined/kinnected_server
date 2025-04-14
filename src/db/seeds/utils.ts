import { Users, Cards, Connections, Credentials } from "../dataTypes";

export function formatFunc(data: Users | Cards | Connections | Credentials ) {
    return data.map((item) => Object.values(item));
  };