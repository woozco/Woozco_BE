# Woozco_BE
## API Docs

| Method | URI                                   | Description            |
|--------|---------------------------------------|------------------------|
| POST   | [/api/auth/login](#post-apiauthlogin)        | user login             |
| POST   | [/api/auth/register](#post-apiauthregister)  | user register          |
| POST   | [/api/auth/changepw](#post-apiauthchangepw)  | change password        |           
| POST   | [/api/auth/verifymail](#post-apiauthverifymail)                   | send email verify code        |
| POST   | [/api/auth/confirm-verifyemail](#post-apiauthconfirm-verifyemail) | confirm verify code           |
| GET    | [/api/board/all](#get-apiboardall)     | get all board      |
| POST    | [/api/board/create](#post-apiboardcreate)     | create board       |
| DELETE    | [/api/board/:id/delete](#delete-apiboardiddelete)     | delete board       |
| POST    | [/api/board/:id/update](#post-apiboardidupdate)     | change board       |

## auth/

### [POST] /api/auth/login

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

### [POST] /api/auth/register

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

### [POST] /api/auth/changepw

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

### [GET] /api/auth/profile

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

### [POST] /api/auth/verifymail

send email verify code  

req.body
```json
{
    "email": "sungyeon52@gmail.com"
}
```

res.body
```json

```

### [POST] /api/auth/confirm-verifyemail

confirm verify code 

req.body
```json
{
    "verifyCode": 844345
}
```

res.body
```json
이메일 인증 완료
```

## board/

### [GET] /api/board/all

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
        "wantLanguage": "Python",
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
        "wantLanguage": "Python",
        "body": "예제 내용입니다."
    },
]
```

### [POST] /api/board/create

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
  "wantLanguage": "Python",
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
  "wantLanguage": "Python",
  "body": "예제 내용입니다."
}
```

### [DELETE] /api/board/:id/delete

delete the board corresponding to the id

No response except status code(204)

### [POST] /api/board/:id/update
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
    "wantLanguage": "Python",
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
    "wantLanguage": "Python",
    "body": "예제 내용입니다."
}
```
