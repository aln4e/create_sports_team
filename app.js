var express = require ('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var fs = require('fs');
let cookieParser = require('cookie-parser');
let session = require('express-session');

var app = express();
app.use(session({ secret: 'antonio is sexy'}))

app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }))
//var winston = require('winston');

//it renders index.ejs when the '/' is called
// app.get('/', function (request, response) {
//   //we read cookies from the request
//   let pageVisits = parseInt(request.cookies.pageVisits) || 0;
//   let secondsToExpire = 60 * 5; // 1 day
//
//   let raw = fs.readFileSync('cookies_data.json');
// //teamUpdates returns .json file with its contents
//   let data = JSON.parse(raw);
// //adds new entries as a new object to the array in the .json file
//
//   //response.cookie('pageVisits', pageVisits + 1); // "Max-Age": secondsToExpire });
//   let views = response.cookie('pageVisits', pageVisits + 1)
//   data.push(views);
// //this converts the .json file into string name/value pairs
//   fs.writeFileSync('cookies_data.json', JSON.stringify(data));
//
//   response.render('index');
// });
//
// app.get('/clear-visit-cookie',
//   function(request, response){
//     response.clearCookie('pageVisits')
//     response.redirect('/')
//   })



//sessions version:
app.get('/', function (request, response) {
  //we read cookies from the request
  let pageViews = request.session.pageViews || 0;
  request.session.pageViews = pageViews + 1;
  response.render('index');
});

app.get('/clear-session',
function(request, response){
  request.session.destroy(function(err){
    if(err){
      response.send("Error clearing session " + err)
    }else{
      response.send("Session Cleared")
    }
  })
})


//this posts the form data to the team update page
app.post('/team-update', function(request, response){
//this variable converts the form data into a (non-js) object
  let responses = request.body;
//the current state of the rawfile is gibberish
  let rawFile = fs.readFileSync('team.json');
//teamUpdates returns .json file with its contents
  let teamUpdates = JSON.parse(rawFile);
//adds new entries as a new object to the array in the .json file
  teamUpdates.push(responses);
//this converts the .json file into string name/value pairs
  fs.writeFileSync('team.json', JSON.stringify(teamUpdates));
//???
  response.render('team-update', { allTeams: teamUpdates } )
});

//
app.get('/league_info', function (request, response) {
  let responses = request.body
  let rawFile = fs.readFileSync('team.json');
  let teamUpdates = JSON.parse(rawFile);

  fs.writeFileSync('team.json', JSON.stringify(teamUpdates))
  response.render('league_info', { responses: teamUpdates } );
});

//allows site access from port 3000
app.listen(3000, function(){
  console.log('Listening on port 3000');
})
