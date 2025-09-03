# KiFome - API

## Routes

```plaintext
USERS
 ├─ POST /users/register
 ├─ POST /users/login
 ├─ GET /users/me
 ├─ PUT /users/me
 ├─ GET /users/:id
 └─ GET /users/:id/recipes

RECIPES
 ├─ POST /recipes
 ├─ GET /recipes
 ├─ GET /recipes/:id
 ├─ PUT /recipes/:id
 └─ DELETE /recipes/:id

COMMENTS
 ├─ POST /recipes/:id/comments
 ├─ GET /recipes/:id/comments
 ├─ PUT /comments/:id
 └─ DELETE /comments/:id

RATINGS / LIKES
 ├─ POST /recipes/:id/like
 ├─ DELETE /recipes/:id/like
 ├─ POST /recipes/:id/rate
 └─ GET /recipes/:id/rating

CATEGORIES / TAGS
 ├─ GET /categories
 ├─ GET /categories/:id
 ├─ GET /tags
 └─ GET /tags/:id
```
