# kinnected (server)

This is a custom API created for the kinnected app (https://github.com/undivfined/kinnected_frontend).

The service is built using TypeScript, PostgreSQL and Express, following the TDD approach (unit and integration testing with Jest).

Deployed version: https://kinnected-server.onrender.com/api/ \
(The service spins down after a period of inactivity and can take about a minute to spin back up. Nothing is returned for /api)

## Tables

- Users: Stores information about users of the app, with username as the unique primary key
- Credentials: Stores the password (hashed password string) associated with a given user (username as a foreign key)
- Connections: Stores information about connections between users, where username_1 and username_2 are foreign keys. The connections are asymmetrical
- Cards: Stores "dummy profiles" associated with users, where creator_username is a foreign key

## Available endpoints

`GET /api/users`

- Responds with an array of all users
- Accepts a "search" query, which must contain only letters and is matched against users' first names, last names or first and last name combined (case-insensitive)

`POST /api/users`

- Accepts requests with a body including the following properties: first_name*, last_name*, username*, timezone*, date_of_birth*, password (hashed password string)*, avatar_url
- Adds a new user

`GET /api/users/:username`

- Responds with an object representing the user with the requested username

`PATCH /api/users/:username`

- Accepts requests with a body including the following properties: first_name, last_name, timezone, date_of_birth, avatar_url; all of which are optional, but at least one must be provided. All values must be truthy, except avatar_url, which can be falsy (but not undefined)
- Responds with the updated user object

`DELETE /api/users/:username`

- Removes the user with the provided username from the database

`GET /api/users/:username/credentials`

- Responds with an object which includes the username and password (hashed password string) for the requested user

`GET /api/users/:username/contacts`

- Responds with an array of objects representing the connections and cards associated with the requested user
- Each object includes an isCard property, specifying the category that the contact belongs to

`POST /api/connections`

- Accepts requests with a body including the following properties: username_1*, username_2*, type_of_relationship, date_of_last_contact, messaging_link
- Adds a new connection

`PATCH /api/connections/:connection_id`

- Accepts requests with a body including the following properties: type_of_relationship, date_of_last_contact; both of which are optional but at least one must be provided. The values must be truthy if provided
- Responds with the updated connection object

`DELETE /api/connections/:connection_id`

- Removes the specified connection from the database

`POST /api/cards`

- Accepts requests with a body including the following properties: creator_username*, name*, timezone\*, type_of_relationship, date_of_last_contact, date_of_birth
- Adds a new card

`PATCH /api/cards/:card_id`

- Accepts requests with a body including the following properties: name, timezone, type_of_relationship, date_of_last_contact, date_of_birth; all of which are optional but at least one must be provided. Name and timezone must be truthy, the other values can be falsy but not undefined
- Responds with the updated card object

`DELETE /api/cards/:card_id`

- Removes the specified card from the database
