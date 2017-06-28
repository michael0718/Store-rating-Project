var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var App = require('./app');
var db = 'mongodb://localhost:27017/data';
mongoose.connect(db);

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}));

var port = 3000;
app.get('/', function(req, res){
  res.sendfile('./index.html');
})


///////////////////////////////USERS////////////////////////////////////////////

app.get('/users', function(req, res){
  var content = {};
  if(req.query.firstname){
    content.firstname = req.query.firstname;
  }
  if(req.query.lastname){
    content.lastname = req.query.lastname;
  }
  if(req.query.sex){
    content.sex = req.query.sex;
  }
  if(req.query.age){
    content.age = req.query.age;
  }
  App.Users.find(content).sort({username: 1})
    .exec(function(err, users){
      if(err){
        res.sendStatus(404);
      }
      else{
        res.json({"users" : users});
      }
    });
});

app.get('/user', function (req, res) {
  var condition = req.query;
  if (condition.id){
    App.Users.findOne({
      _id: req.query.id
    }, function(err, user){
      if (err) {
        res.sendStatus(404);
      } else if(!user){
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    });
  } else if(condition.username){
    App.Users.findOne({
      username: req.query.username
    }, function(err, user){
      if (err) {
        res.sendStatus(404);
      } else if(!user){
        res.sendStatus(404);
      }else {
        res.json(user);
      }
    });
  }
});

app.post('/user', function(req, res){

  App.Users.findOne({"username": req.body.username}, function(err, results){
      if(err){
        res.sendStatus(403);
      }
      else if(!results){
        App.Users.create(req.body, function(err, user){
          if(err){
            res.sendStatus(403);
          }
          else{
            res.sendStatus(200);
          }
        });
      }
      else{
        res.sendStatus(403);
      }
    });
});

  app.put('/user', function(req, res){

    var content = {};
    if(req.body.firstname){
      content.firstname = req.body.firstname;
    }
    if(req.body.lastname){
      content.firstname = req.body.lastname;
    }
    if(req.body.sex){
      content.sex = req.body.sex;
    }
    if(req.body.age){
      content.age = req.body.age;
    }
    App.Users.findOneAndUpdate({
      _id: req.query.id
    },
    {$set: content},
    {upsert: true},
    function(err, user){
       if (err){
         res.sendStatus(404);
       } else{
         console.log(user);
         res.sendStatus(200);
       }
     });
  });

  app.delete('/user', function(req, res){
    App.Users.findOneAndRemove({
      _id: req.query.id
    }, function(err, user){
      if(err){
        res.sendStatus(404);
      } else{
        console.log(user);
        res.sendStatus(204);
      }
    });
  });


  //////////////////////////////////STORES//////////////////////////////////////

  app.post('/store', function(req, res){

    var content = {};
    content.storename = req.body.storename;
    content.category = req.body.category;
    content.address = req.body.address;

    App.Stores.create(content, function(err, user){
      if(err){
        res.sendStatus(403);
      }
      else{
        console.log(user);
        console.log(req.body);
        res.sendStatus(200);
      }
    });
  });

  app.get('/stores', function(req, res){
    var content = {};
    if(req.query.category){
      content.category = req.query.category;
    }
    if(req.query.storename){
      content.storename = req.query.storename;
    }
    App.Stores.find(content).sort({_id: 1})
      .exec(function(err, users){
        if(err){
          res.send('error');
        }
        else{
          console.log(users);
          res.json({"stores" : users});
        }
      });
  });

  app.get('/store', function (req, res) {
    var condition = req.query;
    if (condition.id){
      App.Users.findOne({
        _id: req.query.id
      }, function(err, user){
        if (err) {
          res.sendStatus(404);
        } else if(!user){
          res.sendStatus(404);
        } else {
          res.json(user);
        }
      });
    }
  });

  app.put('/store', function(req, res){

    var content = {};
    if(req.body.storename){
      content.storename = req.body.storename;
    }
    if(req.body.category){
      content.category = req.body.category;
    }
    if(req.body.address){
      content.address = req.body.address;
    }
    App.Users.findOneAndUpdate({
      _id: req.query.id
    },
    {$set: content},
    {upsert: true},
    function(err, user){
       if (err){
         res.sendStatus(404);
       } else{
         console.log(user);
         res.sendStatus(200);
       }
     });
  });

  app.delete('/store', function(req, res){
    App.Users.findOneAndRemove({
      _id: req.query.id
    }, function(err, user){
      if(err){
        res.sendStatus(404);
      } else{
        console.log(user);
        res.sendStatus(200);
      }
    });
  });

///////////////////////////////////REVIEWS//////////////////////////////////////

  app.post('/review', function(req, res){
    App.Users.findOne({"_id": req.body.userID}, function(err, results){
      if(err){
        res.sendStatus(403);
      } else if(!results){
        res.sendStatus(403);
      } else{
        App.Stores.findOne({"_id": req.body.storeID}, function(err, results){
          if(err){
            res.sendStatus(403);
          } else if(!results){
            res.sendStatus(403);
          } else {
            var content = {};
            content.userID = req.body.userID;
            content.storeID = req.body.storeID;
            App.Reviews.find(content)
              .exec(function(err, results){
                if(err){
                  res.sendStatus(403);
                }
                else{
                  var count = results.length
                  if(count != 0){
                    console.log(results);
                    res.sendStatus(403);
                  } else{
                    if(req.body.rating < 0 || req.body.rating > 10){
                      res.sendStatus(403);
                    } else {
                      App.Reviews.create(req.body, function(err, reviews){
                        if(err){
                          res.sendStatus(403);
                        }
                        else{
                          res.sendStatus(200);
                        }
                    });
                  }
                }
              }
            });
          }
        })
      }
    })
  });

  app.get('/review', function(req, res){
    var content = {};
    if(req.query.id){
      content._id = req.query.id;
    }
    if(req.query.storeid){
      content.storeID = req.query.storeid;
    }
    if(req.query.userid){
      content.userID = req.query.userid;
    }
    App.Reviews.find(content)
      .exec(function(err, users){
        if(err){
          res.sendStatus(404);
        }
        else{
          console.log(users);
          res.json({"reviews" : users});
        }
      });
  });

  app.delete('/review', function(req, res){
    var content = {};
    if(req.query.id){
      content._id = req.query.id;
    }
    if(req.query.storeid){
      content.storeID = req.query.storeid;
    }
    if(req.query.userid){
      content.userID = req.query.userid;
    }
    App.Reviews.find(content).remove()
      .exec(function(err, users){
        if(err){
          res.sendStatus(404);
        }
        else{
          console.log(users);
          res.json({"reviews" : users});
        }
      });
  });

  app.put('/review', function(req, res){

    var content = {};
    if(req.body.rating){
      content.rating = req.body.rating;
    }
    if(req.body.comment){
      content.comment = req.body.comment;
    }
    App.Reviews.findOneAndUpdate({
      _id: req.query.id
    },
    {$set: content},
    {upsert: true},
    function(err, user){
       if (err){
         res.sendStatus(404);
       } else{
         console.log(user);
         res.sendStatus(204);
       }
     });
  });






////////////////////////////////////////////////////////////////////////////////

app.listen(port, function(){
  console.log('app listening on port' + port);
});
