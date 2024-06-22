# inventory-sytem

### Authentication Routes

`POST` [/v1/auth/register](#POST/v1/auth/register)

`POST` [/v1/auth/login](#POST/v1/auth/login)

`POST` [/v1/auth/logout](#POST/v1/auth/logout)

### Users Routes

`GET` [/v1/users](#GET/v1/users)

`POST` [/v1/users](#POST/v1/users)

`GET` [/v1/users/:userId](#GET/v1/users/:userId)

`PUT` [/v1/users/:userId](#PUT/v1/users/:userId)

`DELETE` [/v1/users/:userId](#DELETE/v1/users/:userId)

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

## `GET` /v1/users

retrieve all users data

### Queries

|query|type|description|example|
|-|-|-|-|
|***pageIndex**|_number_|the index of current pages|1|
|***pageSize**|_number_|the document limit for every pages|10|

## `POST` /v1/users

create user data

### Body

|key|type|description|
|-|-|-|
|***name**|_string_|the name of user
|***email**|_string_|the email of the user
|***password**|_string_|the password of the user
|**role**|_User, Admin_|the role of the user
|**isEmailVerified**|_boolean_|is user email verified ?

Example:

```json
{
  "name": "hantuKiyowo",
  "email": "hantu@kiyowo.co.uk",
  "password": "hantuK1y0w0@",
  "role": "User",
  "isEmailVerified": false
}
```

## `GET` /v1/users/:userId

retrieve user data

### Parameters

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_uuid_|an user id who need to retrieve|{uuid}|

## `PUT` /v1/users/:userId

update user data

### Parameters

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_uuid_|an user id who will get the data update|{uuid}|

### Body

|key|type|description|
|-|-|-|
|**name**|_string_|the name of user
|**email**|_string_|the email of the user
|**password**|_string_|the password of the user
|**role**|_User, Admin_|the role of the user
|**isEmailVerified**|_boolean_|is user email verified ?

Example:

```json
{
  "name": "hantuKiyowo",
  "email": "hantu@kiyowo.co.uk",
  "password": "hantuK1y0w0@",
  "role": "User",
  "isEmailVerified": false
}
```

## `DELETE` /v1/users/:userId

delete user data

### Parameters

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_uuid_|an user id who will get deleted|{uuid}|
