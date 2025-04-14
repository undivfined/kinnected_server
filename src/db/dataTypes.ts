export type UserObject = {
  first_name: string;
  last_name: string;
  username: string;
  timezone: string;
  date_of_birth: string;
  avatar_url?: string | null;
};

export type Users = UserObject[];

export type CardObject = {
  creator_username: string;
  type_of_relationship?: string;
  name: string;
  timezone: string;
  date_of_birth?: string;
  date_of_last_contact?: string;
};

export type Cards = CardObject[];

export type credentialObject = {
  username: string;
  password: string;
};

export type Credentials = credentialObject[];

export type connectionObject = {
  username_1: string;
  username_2: string;
  type_of_relationship?: string;
  date_of_last_contact?: string;
  messaging_link?: string;
};

export type Connections = connectionObject[];

export type Data = {
  userData: Users;
  credentialsData: Credentials;
  connectionsData: Connections;
  cardData: Cards;
};
