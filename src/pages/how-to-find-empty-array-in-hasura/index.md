---
title: How to find empty arrays in Hasura queries.
date: "2018-09-01"
featuredImage: './featured.webp'
---

Hasura filters are great. However when it comes to Postgres types, it gets a little bit hard to query them. In this post I'll show you how to find all empty arrays in database.

<!-- end -->

Hasura filters are great. However when it comes to Postgres types, it gets a little bit hard to query them. In this post I'll show you how to find all empty arrays in database.

## Data Examples

```sql
CREATE TABLE posts (
    title            text,
    view             integer,
    tags             varchar[]
);
```

So we have a table called `posts` which has a column representing an array of strings which is called `tags`.

### Find all posts having no tag

Arrays in Postgres will be saved in this format `{tag1, tag2}`. So an empty array will be stored as `{}` in the database.

```graphql
query {
  posts(where: { tags: { _eq: "{}" } }) {
    title
  }
}
```
