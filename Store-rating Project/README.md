#### Users

The API should be able to perform CRUD operations on users (what kind of rating app would it be with no users?). The JSON specifications of a user is below, under `POST /users`.

 - `GET /users` - get all the users, ordered by username ascending, in an array under the key `users`.
 - `GET /users?query` - same as above and filtered (exact) by the possible query:
    - `firstname`
    - `lastname`
    - `age`
    - `sex`
An example would be `/users?firstname=Tom&sex=M` could return a JSON object containing a field `users` which is an array of User Objects.

~~~~javascript
{
"users": [
        {   
            "_id": "4723",
            "username": "gump1994",
            "firstname":"Tom",
            "lastname":"Hanks",
            "sex": "M",
            "age": 60
        },
        {
            "_id": "572",
            "username": "h0rcrux",
            "firstname":"Tom",
            "lastname":"Riddle",
            "sex": "M",
            "age": 71
        },
        {
            "_id": "192",
            "username": "m1ssionP0zzible",
            "firstname":"Tom",
            "lastname":"Cruise",
            "sex": "M",
            "age": 54
        }
    ]
}
~~~~

#### Individual Users
Next, we want to be able to get and modify users.

- `POST /user` - in the body of the post request, supply all required fields and support any optional fields. See below on the schema required. If the username provided already exists or is not provided, return a 403 status. If the request is valid, return a 200 status with the new user returned.

NOTE: There are multiple ways to go about making a username unique. Your `_id` field therefore may be different from above but ensure your `username` field is always there! 

 ~~~~javascript
 {
    "_id": {type:String}, //Will be different depending on your implementation, could be Number
    "username": {type: String, required:true, unique:true},
    "firstname":  {type: String, default:""},
    "lastname": {type: String, default:""},
    "sex":  {type: String, default:""},
    "age": {type: Number, default: 0}
}
~~~~

- `GET /user?id=` - get a user by a specific ID. **All objects therefore must have a `_id` field.** If the ID given does not exist, return a 404 status.

An example would be `/user?id=192` returns

 ~~~~javascript
 {
    "_id": "192",
    "username": "m1ssionP0zzible",
    "firstname":"Tom",
    "lastname":"Cruise",
    "sex": "M",
    "age": 54
}
~~~~

- `GET /user?username=` - get a user by a specific username. If the username given does not exist, return a 404 status.

An example would be `/user?username=m1ssionP0zzible` returns

 ~~~~javascript
 {
    "_id": "192",
    "username": "m1ssionP0zzible",
    "firstname":"Tom",
    "lastname":"Cruise",
    "sex": "M",
    "age": 54
}

~~~~

- `DELETE /user?id=`  - deletes a user by a specific ID. Return 404 if the user does not exist. When deleting a user, also delete their reviews. (See below). e.g.
`/user?id=192` would remove the user with 192 as their id. Calling it again would result in a 404 response.

- `PUT /user?id=` - updates an already existing user via the body. If the username key is passed as well, ignore the username key. If the user doesn't exist, return a 404 error. If the request is valid, return a 200 with the updated user returned. We will assume all fields passed are fields in the user schema.

Example before:

~~~~javascript
{
    "_id": "231",
    "username": "TotallyNotAFakeUser",
    "firstname":"Nigerian",
    "lastname":"Prince",
    "sex": "M",
    "age": 174
}
~~~~

`PUT /user?id=231` with body:
~~~~ javascript
{
    "username":"shouldNotChange",
    "firstname":"HongKong",
    "lastname":"banker",
    "age": 28
}
~~~~
The database now looks like the following and should return:
~~~~ javascript
{
    "_id": "231",
    "username": "TotallyNotAFakeUser",
    "firstname":"HongKong",
    "lastname":"banker",
    "sex": "M",
    "age": 28
}
~~~~

#### Stores

 - `GET /stores` - gets all stores, ordered by storename in ascending order (In case of a tie, they should be sorted by ID in ascending order), as an array in the key `stores`
 - `GET /stores?query` Same as above and filtered (exact) by the query:
    - `category`
    - `storename`

e.g. `/stores?category=department` would return:
~~~~javascript
{
"stores": [
        {
            "_id": "4231",
            "storename": "gartet",
            "category":"department",
            "Address":"123 Steals Avenue"
        },
        {
            "_id": "133",
            "storename": "mallWart",
            "category":"department",
            "Address":"405 Blore Street"
        },
        {
            "_id": "431",
            "storename": "mallWart",
            "category":"department",
            "Address":"83 Dawn Mills Road"
        },
        {
            "_id": "192",
            "storename": "One Square",
            "category":"department",
            "Address":"831 Young Street"
        }
    ]
}
~~~~

#### Individual Stores
For stores, chains may share the same name. Therefore, their only identifier is their `_id`.

- `POST /store` - in the body of the post request, supply all required fields and include any optional fields. See below on the schema required. Return a 200 if the request is valid with the newly created store. Return a 403 if no storename is provided or the storename is blank.
 ~~~~javascript
{
    "_id": {type:String}, 
    "storename": {type: String, required:true},
    "department":  {type: String, default:""},
    "address": {type: String, default:""}
}
~~~~

- `GET /store?id=` - get a store by a specific ID. All objects therefore must have a `_id` field. If the ID given does not exist, return a 404 status.
An example would be `/store?id=192` returns:
 ~~~~javascript
{
    "_id": "192",
    "storename": "One Square",
    "category":"department",
    "Address":"831 Young Street"
}
~~~~~

- `DELETE /store?id=`  - deletes a store by a specific ID. Return 200 status if the store exists. Return 404 if the store does not exist. When deleting a store, also delete their reviews. (See below).
`/store?id=192` would remove the store with 192 as their id. Calling it again would result a 404 response.

- `PUT /store?id=` - updates an already existing store via the body. If the store doesn't exist, return a 404 error. Assume all fields passed are fields in the store schema. Return a 200 if the request is valid with the updated store.
Example before:
~~~~javascript
{
    "_id": "192",
    "storename": "One Square",
    "category":"department",
    "Address":"831 Young Street"
}
~~~~
`PUT /store?id=192` with body:
~~~~ javascript
{
    "storename": "One Square Budson's Hay",
    "category":"clothing"
}
~~~~
The database now looks like this and should return:
~~~~ javascript
{
    "_id": "192",
    "storename": "One Square Budson's Hay",
    "category":"clothing",
    "Address":"831 Young Street"
}
~~~~

#### Reviews
Finally, onto the good part. We need user ratings for a rating app ([Have you ever had shoes without shoe strings?](https://genius.com/3392)). As a reminder, when a user or store gets deleted, all reviews involving the user or store respectively should also be deleted.

- `POST /review` - A post request must have both the userID and the storeID. A rating must be from 0 to 10 inclusive. Return a 403 status if either store or user does not exist, the rating is not from 0 to 10, or the combination of userID and storeID review already exists.  Below is a schema of a review. Return a 200 if the request is valid with the newly created review.
~~~~javascript
{
    "_id": {type:String},
    "userID": {type: String, required:true},
    "storeID":  {type: String, required:true},
    "rating": {type:Number, required:true},
    "comment":{type:String}
}
~~~~

- `GET /review?id=`- get the review with the corresponding ID. If the id does not exist, return a 404 status.

Example `/review?id=123`
~~~~javascript
{
    "_id":"123",
    "userID":"123",
    "storeID":"456",
    "rating":0,
    "comment": ""
}
~~~~

- `GET /review?storeid=` - Get all reviews with the corresponding storeID, sorted by rating then `_id` ascending. Even if the storeid does not exist, return an empty reviews array. It should return a JSON object with reviews in an array under the key `reviews`.

Example:

`GET /review?storeid=132`
~~~~javascript
{
    "reviews": [
        {
            "_id":"231",
            "userID": "894",
            "storeID":"631",
            "rating": 4,
            "comment": "No one respects the 'Quiet Study Space' on the second floor :("
        },
        {   "_id":"152",
            "userID": "1256",
            "storeID":"631",
            "rating": 8,
            "comment": "Building is beautiful, the people inside unfortunately smell..."
        },
        {   "_id":"315",
            "userID": "5313",
            "storeID":"631",
            "rating": 8,
            "comment": "If only they have some windows and macs around!"
        },
        {   "_id":"426",
            "userID": "1256",
            "storeID":"631",
            "rating": 10,
            "comment": "Love the supply of soylents and ice cream sandwiches on hand!"
        }
    ]
}
~~~~

- `GET /review?userid=` - similar to storeid, but for users:

Example `GET /review?userid=5123`
~~~~javascript
{
    "reviews": [
            {   "_id":"152",
            "userID": "5123",
            "storeID":"631",
            "rating": 2,
            "comment": "' OR '1'='1'"
        },
        {   "_id":"315",
            "userID": "5123",
            "storeID":"421",
            "rating": 8,
            "comment": "<script type=\"text/javascript\">alert(\"HACKED!\")</script>"
        },
        {   "_id":"426",
            "userID": "5123",
            "storeID":"6731",
            "rating": 10,
            "comment": "\n\n\n\n\n"
        }
		]
}
~~~~

- `DELETE /review?id=` - delete the review with the corresponding ID. If the id does not exist, return a 404 status.
- `DELETE /review?storeid=` - delete all reviews with the corresponding storeID. If the storeID does not exist, return a 404 status.
- `DELETE /review?userid=` - delete all reviews with the corresponding userID. If the userID does not exist, return a 404 status.
- `PUT /review?id=` - modify a review. Do not modify the storeID or userID (ignore the field). If the review does not exist, return a 404 status. Return a 200 with the updated review if successful.
Example:

Before
~~~~javascript
{
    "_id":"531",
    "storeID":"132",
    "userID":"152",
    "rating":3,
    "comment":""
}
~~~~

`PUT /review?id=531`
~~~~javascript
{
    "userID":"42",
    "rating":5,
    "comment":"insert text here"
}
~~~~

After and return:
~~~~javascript
{
    "_id":"531",
    "storeID":"132",
    "userID":"152"
    "rating":5,
    "comment":"insert text here"
}
~~~~
