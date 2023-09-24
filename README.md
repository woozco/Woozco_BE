# Wooriya_BE

## API Docs

| Method | URI                                   | Description            |
|--------|---------------------------------------|------------------------|
| POST   | [/auth/login](#post-authlogin)        | user login             |
| POST   | [/auth/register](#post-authregister)  | user register          |
| POST   | [/auth/changepw](#post-authchangepw)  | change password        |           
| GET    | [/auth/profile](#get-authprofile)     | get user profile       |


### [POST] /auth/login

user login

req.body
```json
{
  "email": "testemail@email.com",
  "password": "testpassword"
}
```

res.body
```json
{
    "access_token": [TOKEN]
}
```

### [POST] /auth/register

user register

req.body
```json
{
  "name": "조성연",
  "email": "testemail@email.com",
  "password": "testpassword"
}
```

res.body
```text
Add user 조성연
```

### [POST] /auth/changepw

change password
(need Authorization header)

req.body
```json
{
  "password": "testpassword1"
}
```

res.body
```text
Change password for 조성연
```

### [GET] /auth/profile

get user profile
(need Authorization header)

res.body

```json
{
    "sub": "testemail@email.com",
    "username": "조성연",
    "iat": 1695532333, // issued time for token
    "exp": 1695534133  // expire time for token
}
```

