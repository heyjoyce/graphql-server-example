## A query language for your API

GraphQL은 API를 위한 쿼리 언어이며 이미 존재하는 데이터로 쿼리를 수행하기 위한 런타임 입니다. GraphQL은 API에 있는 데이터에 대한 완벽하고 이해하기 쉬운 설명을 제공하고 클라이언트에게 필요한 것을 정확하게 요청할 수 있는 기능을 제공하며 시간이 지남에 따라 API를 쉽게 진화시키고 강력한 개발자 도구를 지원합니다.

- 필요한 것을 구체적으로 요청할 수 있습니다
- 단일 요청으로 많은 데이터를 얻을 수도 있습니다
- 엔드포인드가 아닌 타입 시스템으로 원하는 데이터를 선언합니다

```graphql
type User {
  id: ID!
  loggedIn: Boolean!
  nickname: String
  imageUrl: String
}
```

## Manage APIs effectively

- :white_check_mark: 강력한 개발자 도구를 통해 문서를 대체
- :white_check_mark: 버전 관리 없이 API 를 지속적으로 업데이트
- :white_check_mark: 타입 시스템으로 인한 높은 재사용성

## Learn

- https://graphql.org/learn/

### Query and Mutation

```graphql
type Query {
  user(id: Int!): User
}

type Mutation {
  userCreate(input: UserInput!): User
}
```

### Schemas and Types

```graphql
type User {
  id: ID!
  loggedIn: Boolean!
  nickname: String
  imageUrl: String
}
```

### Interfaces

```graphql
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  loggedIn: Boolean!
  nickname: String
  imageUrl: String
}

type Post implements Node {
  id: ID!
  title: String
}
```

```graphql
type Query {
  search(text: String!): [Node]
}
```

```graphql
{
  search(text: "an") {
    __typename
    id
    ... on User {
      nickname
      imageUrl
    }
    ... on Post {
      title
    }
  }
}
```

### Union Types

```graphql
union SearchResult = User | Post

type Query {
  search(text: String!): [SearchResult]
}
```

```graphql
{
  search(text: "an") {
    __typename
    id
    ... on User {
      nickname
      imageUrl
    }
    ... on Post {
      title
    }
  }
}
```

> `__typename` 필드로 클라이언트에서 서로 다른 데이터 유형을 구분할 수 있습니다