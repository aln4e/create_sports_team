var express = require ('express');
var bodyParser = require('body-parser')
var fs = require('fs') // this is the new part
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))



//this paths to the homepage
app.get('/', function (request, response) {
  response.render('index');
});

//this posts the form data to the team update page
app.post('/team-update', function(request, response){
  let responses = request.body
  let rawFile = fs.readFileSync('team.json');
  let teamUpdates = JSON.parse(rawFile);

  teamUpdates.push(responses);

  fs.writeFileSync('team.json', JSON.stringify(teamUpdates))

  response.render('team-update', { responses: teamUpdates } )
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
