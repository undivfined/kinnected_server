export interface CreateUserDto {
    user: string;
}

export type CreateConnectionDto = {
  username_1: string;
  username_2: string;
  type_of_relationship?: string;
  date_of_last_contact?: string;
  messaging_link?: string;
};