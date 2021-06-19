## Install

```sh
$ yarn install
```

## Run tests

```sh
$ yarn test
```

## Usage

```sh
$ yarn dev
```

## Schema

```graphql
type User {
  id: ID!
  loggedIn: Boolean!
  nickname: String
  imageUrl: String
}
```

### GraphQL Playground

```
http://localhost:8000/graphql
```


```graphql
query User($id: Int!) {
  session(id: $id) {
    loggedIn
  }
}
```

`QUERY VARIABLES`
```
{ "id": 1 }
```

`Response`
```
{
  "data": {
    "session": {
      "loggedIn": true
    },
    "profile": {
      "nickname": "사월이",
      "imageUrl": "https://s3.ap-northeast-2.amazonaws.com/heyjoyce.com/user/C9831075-56CA-432A-B0E2-76B5CBD7192D.jpeg"
    }
  }
}
```