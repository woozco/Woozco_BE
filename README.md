# Wooriya_BE

## API Docs

| Method | URI                                   | Description            |
|--------|---------------------------------------|------------------------|
| POST   | [/auth/login](#post-authlogin)        | user login             |
| POST   | [/auth/register](#post-authregister)  | user register          |
| POST   | [/auth/changepw](#post-authchangepw)  | change password        |           
| GET    | [/board/all](#get-boardall)     | get all board      |
| POST    | [/board/create](#post-boardcreate)     | create board       |
| DELETE    | [/board/:id/delete](#delete-boardiddelete)     | delete board       |
| POST    | [/board/:id/update](#post-boardidupdate)     | change board       |

## auth/

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

## board/

### [GET] /board/all

get all board 

res.body

```json
[
    {
        "id": 3,
        "type": "mentee",
        "title": "예제 제목",
        "date": "2023-10-03",
        "startTime": "09:00 AM",
        "endTime": "11:00 AM",
        "linkOfProblem": "https://example.com/problem",
        "wantLanguage": "English",
        "body": "예제 내용입니다."
    },
    {
        "id": 4,
        "type": "mentee",
        "title": "예제 제목",
        "date": "2023-10-03",
        "startTime": "09:00 AM",
        "endTime": "11:00 AM",
        "linkOfProblem": "https://example.com/problem",
        "wantLanguage": "English",
        "body": "예제 내용입니다."
    },
]
```

### [POST] /board/create

create board 

req.body
```json
{
  "id": 2,
  "type": "mentee",  // 또는 "mentor"
  "title": "예제 제목",
  "date": "2023-10-03",
  "startTime": "09:00 AM",
  "endTime": "11:00 AM",
  "linkOfProblem": "https://example.com/problem",
  "wantLanguage": "English",
  "body": "예제 내용입니다."
}
```
res.body

```json
{
  "id": 2,
  "type": "mentee",  // 또는 "mentor"
  "title": "예제 제목",
  "date": "2023-10-03",
  "startTime": "09:00 AM",
  "endTime": "11:00 AM",
  "linkOfProblem": "https://example.com/problem",
  "wantLanguage": "English",
  "body": "예제 내용입니다."
}
```

### [DELETE] /board/:id/delete

delete the board corresponding to the id

No response except status code(204)

### [POST] /board/:id/update
update the board corresponding to thd id

req.body

```json
{
    "id": 2,
    "type": "mentor",
    "title": "예제 제목",
    "date": "2023-10-03",
    "startTime": "09:00 AM",
    "endTime": "11:00 AM",
    "linkOfProblem": "https://example.com/problem",
    "wantLanguage": "English",
    "body": "예제 내용입니다."
}
```

res.body


```json
{
    "id": 2,
    "type": "mentor",
    "title": "예제 제목",
    "date": "2023-10-03",
    "startTime": "09:00 AM",
    "endTime": "11:00 AM",
    "linkOfProblem": "https://example.com/problem",
    "wantLanguage": "English",
    "body": "예제 내용입니다."
}
```