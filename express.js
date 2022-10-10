var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');

//global variable
//tweetinfo is like an array/hash map that has key/values of tweet objects!
var tweetinfo = []



fs.readFile('favs.json', 'utf8', function readFileCallback(err, data) {
  if (err) {
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else {
    //cant directly store, so use JSON.parse!
    tweetinfo = JSON.parse(data);
  }
});
//-------------------------------------
//Get functions
//user info
app.get('/tweets', function (req, res) {
  console.log("Checking");
  

  res.send({tweetinfo:tweetinfo});
});

//tweet info
app.get('/tweetinfo', function (req, res) 
{
  console.log("Checking");
  res.send({tweetinfo:tweetinfo});
});

//gives back searched tweet
app.get('/searchinfo', function (req, res) 
{

  console.log("Checking");
  res.send({tweetsearch:tweetsearch});

}
);

//--------------------------------------
//posts searched tweets
app.post('/searchinfo', function (req, res) 
{

  var tweetid = req.body.id;
  var flag = false;
  var targetTweet;

  tweetinfo.forEach(function (tweet, index) {
//if tweets match, then push! 
    if (!flag && Number(tweet.id) === Number(tweetid))
     {
      tweetsearch.push(tweet);
      targetTweet = tweet;

    }

  });

});

app.post('/tweetinfo', function (req, res) {

  var newTweet = req.body.text;
  var newID = req.body.id;
  var currentTime = new Date().toString();
  tweetinfo.push({
    id: newID,
    text: newTweet,
    created_at: currentTime

  });
});
//---------------------------------------
//update Screen Name
app.put('/tweets/:nm', function (req, res) {
 
  var nm = req.params.nm;
  var newName = req.body.newName;
  var flag = false;

  
  tweetinfo.forEach(function (tweet, index)
   {
    //if old name is found, replace with new name!
    if (!flag && tweet.user.name === nm) {
      tweet.user.screen_name = newName;
      console.log("Checking");
    }
  });
});

//Delete
app.delete('/tweetinfo/:tweetid', function (req, res) {
 

  var tweetid = req.params.tweetid;
  var flag = false;
  tweetinfo.forEach(function (tweet, index) 
  {
     //if tweetid matches then delete!
    if (!flag && Number(tweet.id) === Number(tweetid)) {
      tweetinfo.splice(index, 1);
    
    }
  });
});

app.listen(PORT, function () {

  console.log('Server listening on ' + PORT);
});