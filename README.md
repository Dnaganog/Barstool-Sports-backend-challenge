# Backend Challenge

1. Modify the `GET /status` route to only return a `200 OK` if the server is currently connected to the database
> Modified: 
<br> `app/api/status/controller`
2. Add a test for `PUT /user/:id` that shows the current user must match the user id in the url in order for the update to be successful
> Modified:
<br> `app/api/user/controller`
<br> `test/api/user/read-by-id`
3. Create a new module called `notes` that lets a user a save notes to their account. A `Note` should simply have a title and a message in addition to the common properties such as id, createdAt and modifiedAt.
> Added:
<br> `modules/notes/index`
<br> `modules/notes/model`
<br> `modules/notes/service`
<br> Modified:
<br> `modules/user/model`
4. Add the route `GET /user/:id/notes` which should list all notes for that user. Remember to ensure the user id in the url matches the current user making the request
> Added:
<br> `app/api/notes/auth`
<br> `app/api/notes/controller`
<br> `app/api/notes/index`
<br> `app/api/notes/router`
<br> `app/api/notes/validator`
<br> Modified:
<br> `app/api/index`
5. Add a test for the previous route to show that it works correctly
> Modified:
<br> `test/lib/mock-data`
<br> `test/api/user/read-by-id`
6. Add a route `POST /note` which should let a logged in user create a note and save it to their account
> Modified:
<br> `app/api/common/auth`
<br> `test/api/user/read-by-id`
