$(function () {
  //Get user
  $('#get-button').on('click', function () {
    //TODO: get all users' IDs & display it
    $.ajax({
      method: 'GET',
      url: '/tweets',
      contentType: 'application/json',
      success: function (response) {

        var tbodyEl = $('#namebody');

        tbodyEl.html('');

        response.tweetinfo.forEach(function (tweet) {
          tbodyEl.append('\
                  <tr>\
                      <td class="id">' + tweet.user.id + '</td>\
                      <td class="id">' + tweet.user.screen_name + '</td>\
                      <td class="user id">' + tweet.user.name + '</td>\
                  </tr>\
           ');
        });
     }
  });

  });

  //Get tweets
  $('#get-tweets-button').on('click', function () {
    //TODO: get tweet info and display it
    $.ajax({
      method: 'GET',
      url: '/tweetinfo',
      contentType: 'application/json',
      success: function (response) {
        var tbodyEl = $('#tweetbody');
        tbodyEl.html('');
        response.tweetinfo.forEach(function (tweet) {
          tbodyEl.append('\
                  <tr>\
                      <td class="id">' + tweet.id + '</td>\
                      <td class="id">' + tweet.text + '<td>\
                      <td class="user id">' + tweet.created_at + '</td>\
                  </tr>\
      ');
      });
     }
    });
  });

  //Get searched tweets
  $('#get-searched-tweets').on('click', function () {
    //TODO: get a searched tweet(s) & display it
    $.ajax({
      url: '/searchinfo',
      contentType: 'application/json',
      success: function (response) {
        var tbodyEl = $('#searchbody');
        tbodyEl.html('');
        response.tweetsearch.forEach(function (tweet) {
          tbodyEl.append('\
            <tr>\
            <td class="id">' + tweet.id + '</td>\
            <td class="id">' + tweet.text + '<td>\
            <td class="user id">' + tweet.created_at + '</td>\
        </tr>\
       ');
      });
    }
    });
  });

  //Create tweet
  $('#create-form').on('submit', function (event) {
    event.preventDefault();

    var createInput = $('#create-input');
    var inputString = createInput.val();
    const parsedStrings = inputString.split(';'); 
    var id = parsedStrings[0]; //left side of ';' in input
    var text = parsedStrings[1];// right side of ';' in input

    
    $.ajax({

      url: '/tweetinfo',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ id: id, text: text }),
      success: function (response) {
      createInput.val('');

      
    }
    })
  });

  //update user screen name
  $("#update-user").on('submit', function (event) {
    event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var nm = parsedStrings[0]; //left side of ';' in input
    var newName = parsedStrings[1]; //right side of ';' in input

    
    $.ajax({


      url: '/tweets/' + nm,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({newName:newName}),
      success: function (response) {
        console.log(response);
      }
    })
  });

  //Delete tweet
  $("#delete-form").on('submit', function () {
    var tweetid = $('#delete-input').val();
    event.preventDefault();

    $.ajax({

      url: '/tweetinfo/' + tweetid,
      method: 'DELETE',
      contentType: 'application/json',
      success: function (response) {
        console.log(response);

      }
    });
  });

  //Create searched tweets
  $('#search-form').on('submit', function (event) {
    event.preventDefault();
    var tweetid = $('#search-input');

  });
});

function test_print(){

  console.log(" test code ");

}