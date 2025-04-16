// response type interfaces go here
export type ContactResponse = {
  contact_id: number;

  name: string;
  type_of_relationship: string | undefined;
  timezone: string;
  date_of_birth: string | undefined;
  date_of_last_contact: string | undefined;
  isCard: boolean;
  messaging_link: string | undefined;
};
