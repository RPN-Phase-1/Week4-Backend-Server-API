# inventory-sytem

`POST` [/v1/auth/register](#POST/v1/auth/register)

`POST` [/v1/auth/login](#POST/v1/auth/login)

`POST` [/v1/auth/logout](#POST/v1/auth/logout)

## `POST` /v1/auth/register

to register so we can use login

### Body

|key|type|description|
|-|-|-|
|***email**|_string_|an user email
|***password**|_string_|a user password
|***name**|_string_|a fantastic name of your
|**role**|_Admin, User_|an user role

Example:

```json
{
  "email": "rakemoon@super.ma.il",
  "password": "@4kuW1bu",
  "name": "ImRakemoon",
  "role": "Admin"
}
```

## `POST` /v1/auth/login

to login and get tokens for accessing another api endpoint

### Body

|key|type|description|
|-|-|-|
|***email**|_string_|an user email
|***password**|_string_|an user password

Example:

```json
{
  "email": "rakemoon@super.ma.il",
  "password": "@4kuW1bu"
}
```

## `POST` /v1/auth/logout

to logout of course

### Body

|key|type|description|
|-|-|-|
|***email**|_string_|an user email

Example:

```json
{
  "email": "rakemoon@super.ma.il"
}
```
