// response type interfaces go here
export type ContactResponse = {
  id: Number;

  name: String;
  type_of_relationship: String | undefined;
  timezone: String;
  date_of_birth: String | undefined;
  date_of_last_contact: String | undefined;
  isCard: Boolean;
  messaging_link: String | undefined;
};
