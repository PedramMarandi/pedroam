---
title: How to query for empty arrays using Hasura.
tags: ["hasura"]
date: "2018-09-01"
featuredImage: './featured.webp'
---

Hasura filters are really comprehensive. However when it comes to Postgres types like arrays, it gets a little bit hard to query data. In this post I want to show you how to query for empty arrays using Hasura.io.

<!-- end -->

## Data Examples

```sql
CREATE TABLE posts (
    title            text,
    view             integer,
    tags             varchar[]
);
```

So we have a table called `posts` which has the column `tags` representing an array of strings.

## Find all posts having empty tags

In Postgres, arrays are being saved in this format `{tag1, tag2}`. So an empty array will be stored as `{}` in the database. So we can use `_eq` and `{}` together like the below example:

```graphql
query {
  posts(where: { tags: { _eq: "{}" } }) {
    title
  }
}
```
