var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

//var autoIncrement = require("mongodb-autoincrement");

/**
 * Note that the database was loaded with data from a JSON file into a
 * collection called gillers.
 */
var UsersSchema = new Schema(
  {
   "username": {type: String, required:true, unique:true},
   "firstname":  {type: String, default:""},
   "lastname": {type: String, default:""},
   "sex":  {type: String, default:""},
   "age": {type: Number, default: 0}
  },
  {
    collection: 'users'
  }
);

var StoresSchema = new Schema(
  {
   "storename": {type: String, required:true},
   "category":  {type: String, default:""},
   "address": {type: String, default:""}
  },
  {
    collection: 'stores'
  }
);

var ReviewsSchema = new Schema(
  {
    "userID": {type: String, required:true},
    "storeID":  {type: String, required:true},
    "rating": {type:Number, required:true},
    "comment":{type:String}
  },
  {
    collection: 'reviews'
  }
);



// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = {mongoose : mongoose,
                  Users : mongoose.model('users', UsersSchema),
                  Stores : mongoose.model('stores', StoresSchema),
                  Reviews : mongoose.model('reviews', ReviewsSchema)};
