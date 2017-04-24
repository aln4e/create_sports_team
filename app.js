var express = require ('express');
var bodyParser = require('body-parser')
var fs = require('fs') // this is the new part
var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (request, response) {
  response.render('index');
});

app.post('/team-update', function(request, response){
  let responses = request.body
  let rawFile = fs.readFileSync('team.json');
  let teamUpdates = JSON.parse(rawFile);

  teamUpdates.push(responses);

  fs.writeFileSync('team.json', JSON.stringify(teamUpdates))

  response.render('team-update', { responses: teamUpdates } )

});

app.get('/playerSelection', function (request, response) {
  response.render('pick-players');
});

app.post('/team-update', function(request, response){
  let responses = request.body
  let rawFile = fs.readFileSync('team.json');
  let teamUpdates = JSON.parse(rawFile);

  teamUpdates.push(responses);

  fs.writeFileSync('team.json', JSON.stringify(teamUpdates))

  response.render('team-update', { responses: teamUpdates } )

});

app.listen(3000, function(){
  console.log('Listening on port 3000');
})
