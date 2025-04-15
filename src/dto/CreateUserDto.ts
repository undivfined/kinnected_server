export interface CreateUserDto {
  username: string;
  first_name: string;
  last_name: string;
  timezone: string;
  date_of_birth: string;

  avatar_url?: string;
  password: string;
}
