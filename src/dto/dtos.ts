export interface CreateUserDto {
  username: string;
  first_name: string;
  last_name: string;
  timezone: string;
  date_of_birth: string;
  avatar_url?: string;
  password: string;
}

export interface CreateConnectionDto {
  username_1: string;
  username_2: string;
  type_of_relationship?: string;
  date_of_last_contact?: string;
  messaging_link?: string;
};

export interface ChangeConnectionDto {
  type_of_relationship?: string;
  date_of_last_contact?: string;
};