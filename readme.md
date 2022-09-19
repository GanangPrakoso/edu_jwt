## Intro

- monolitik app -> cek dan proses simpan data di satu tempat -> `session` -> sifatnya stateful

frontend <-> backend

- REST API -> `JSON web token` -> sifatnya stateless

## JWT apa itu?

JWT merupakan sebuah standar terbuka yang umum digunakan di aplikasi modern. JWT mendefinisikan suatu cara untuk mentransfer data secara compact antara tempat/sistem yang berbeda.

Data yang ditransfer ini sudah seharusnya verified dan digitally signed. Jadi tidak sembarang client bisa memakai service si servernya nanti.

bentuknya bagaimana?

```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
```

### Cara bikinnya gimana???

JWT dibagi jadi 3 bagian:

- Header -> x
- Payload -> y
- Signature -> z

```
xxxxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyy.zzzzzzzzzzzzzzzz
```

Header

- header merupakan kepala dari data yang di transfer
- isinya? umumnya algoritma dari enkripsi yang digunakan
- `Base64 encoded`

contoh:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Payload

- isinya merupakan _claims_ (identitas si user. dan bisa ditambah data2 lain)
- `Base64 encoded`

contoh:

```json
{
  "id": 1,
  "username": "Ebel Cobra"
}
```

Signature

- merupakan bagian verifikasi token

format??

```
TIPE_ENKRIPSI(
  base64Header + "." + base64Payload, kataKunciRahasia
)
```

## Let's Demo

Bikin suatu aplikasi yang mempunyai endpoint berikut:

#### /users/register

- status code: 201

```
{
  "message": "user with email <your email> has been created"
}
```

#### /users/login

- status code: 200

```
{
  "access_token": "....."
}
```

## Referensi

- https://jwt.io/introduction
- https://medium.com/@kennch/stateful-and-stateless-authentication-10aa3e3d4986
