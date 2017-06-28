//reference: https://www.youtube.com/watch?v=5nL7X1UMWsc
$(function(){

  var $orders = $('#orders');
  var $allstores = $('#allstores');
  var $newusername = $('#newusername');
  var $newfirstname = $('#newfirstname');
  var $newlastname = $('#newlastname');
  var $newsex = $('#newsex');
  var $newage = $('#newage');
  var $newstorename = $('#newstorename');
  var $newcategory = $('#newcategory');
  var $newaddress = $('#newaddress');
  var $newuserID = $('#newuserID');
  var $newstoreID = $('#newstoreID');
  var $newrating = $('#newrating');
  var $newcomment = $('#newcomment');


  $.ajax({
    type: 'GET',
    url: '/users',
    dataType: 'json',
    success: function(response){
      console.log('success', response);
      response.users.forEach(function(users){
        $orders.append('<li>username: '+ users.username +', firstname: '+ users.firstname + ', lastname: ' + users.lastname + ', sex: ' + users.sex + ', age:'+ users.age + '</li>');
      })
      /*$.each(orders, function(i, users){
        $orders.append('<li>username: '+ users.username +', firstname: '+ users.firstname + '</li>');

      });*/
    },
    error: function(){
      alert('error loading');
    }
  });

  $.ajax({
    type: 'GET',
    url: '/stores',
    dataType: 'json',
    success: function(response){
      console.log('success', response);
      response.stores.forEach(function(users){
        $allstores.append('<li>storename: '+ users.storename +', category: '+ users.category + ', address: ' + users.address + '</li>');
      })
        /*$.each(orders, function(i, users){
          $orders.append('<li>username: '+ users.username +', firstname: '+ users.firstname + '</li>');

        });*/
    },
    error: function(){
      alert('error loading');
    }
  });

$('#allusers').on('click', function(){
  $.ajax({
    type: 'GET',
    url: '/users',
    dataType: 'json',
    success: function(response){
      console.log('success', response);
      response.users.forEach(function(users){
        $orders.append('<li>username: '+ users.username +', firstname: '+ users.firstname + ', lastname: ' + users.lastname + ', sex: ' + users.sex + ', age:'+ users.age + '</li>');
      })
      /*$.each(orders, function(i, users){
        $orders.append('<li>username: '+ users.username +', firstname: '+ users.firstname + '</li>');

      });*/
    },
    error: function(){
      alert('error loading');
    }
  });
});

  $('#adduser').on('click', function(){
    var order = {
      username: $newusername.val(),
      firstname: $newfirstname.val(),
      lastname: $newlastname.val(),
      sex: $newsex.val(),
      age: $newage.val(),
    };

    $.ajax({
      type: 'POST',
      url: '/user',
      data: order,
      success:function(newOrder){
        $orders.append('<li>username: '+ newOrder.username +', firstname: '+ newOrder.firstname + '</li>');
      },
      error: function(){
        alert(orders);
      }
    })
  });

  $('#searchusers').on('click', function(){
    var order = {
      username: $newusername.val(),
    };

    $.ajax({
      type: 'GET',
      url: '/user',
      data: order,
      success:function(response){
        response.users.forEach(function(users){
          $orders.append('<li>username: '+ users.username +', firstname: '+ users.firstname + ', lastname: ' + users.lastname + ', sex: ' + users.sex + ', age:'+ users.age + '</li>');
        })
      },
      error: function(){
        alert(response);
      }
    })
  });

  //get applicant by family name
$("#searchusers").click(function()
{
      //Get value from form input
      var name = document.getElementById("newinput").value;
      console.log("name is: " + name);

      var fullUrl = "/user?username="+name;

      $.ajax({
            url: fullUrl,
            type: "GET",
            dataType: "json",
            success: function (response){
              response.users.forEach(function(users){
                $orders.append('<li>username: '+ users.username +', firstname: '+ users.firstname + ', lastname: ' + users.lastname + ', sex: ' + users.sex + ', age:'+ users.age + '</li>');
              })

            },
            error: function(){
              alert(orders);
            }

        });
      });

$('#getstores').on('click', function(){
      $.ajax({
        type: 'GET',
        url: '/stores',
        dataType: 'json',
        success: function(response){
          console.log('success', response);
          response.stores.forEach(function(users){
            $allstores.append('<li>storename: '+ users.storename +', category: '+ users.category + ', address: ' + users.address + '</li>');
          })
            /*$.each(orders, function(i, users){
              $orders.append('<li>username: '+ users.username +', firstname: '+ users.firstname + '</li>');

            });*/
        },
        error: function(){
          alert('error loading');
        }
      });
    });

    $('#addstore').on('click', function(){
      var order = {
        storename: $newstorename.val(),
        category: $newcategory.val(),
        address: $newaddress.val(),
      };

      $.ajax({
        type: 'POST',
        url: '/store',
        data: order,
        success:function(newOrder){
          $orders.append('<li>storename: '+ newOrder.storename +', category: '+ newOrder.category + ', address: ' + newOrder.address + '</li>');
        },
        error: function(){
          alert(orders);
        }
      })
    });

    $('#addreview').on('click', function(){
      var order = {
        userID: $newuserID.val(),
        storeID: $newstoreID.val(),
        rating: $newrating.val(),
        comment: $newcomment.val(),
      };

      $.ajax({
        type: 'POST',
        url: '/store',
        data: order,
        success:function(newOrder){
          $orders.append('<li>storename: '+ newOrder.storename +', category: '+ newOrder.category + ', address: ' + newOrder.address + '</li>');
        },
        error: function(){
          alert(orders);
        }
      })
    });
});
