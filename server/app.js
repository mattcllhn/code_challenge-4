var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
// var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/dessertDB';
var port = process.env.PORT || 3000;

// var urlencodedParser= bodyParser.urlencoded({extended:false});
app.use(bodyParser.urlencoded( {extended: false } ));
app.use(bodyParser.json());
app.use( express.static( 'public' ) );//<<<<<I couldn't get static to work


app.listen(port, function(req, res){
  console.log('im listening');
});//app.listen

app.get('/', function(req, res){
  console.log('base url hit');          // I had to route from root and I don't know why
  res.sendFile(path.resolve('server/public/views/index.html'));
});//app.get



app.get('/treats', function(req, res){
  console.log('/treats hit');
  pg.connect(connectionString, function(err, client, done){

  if(err){console.log('this is the err -------->',err);}
  else {
    console.log('in else');

    var resultsArray=[];
    var queryresult= client.query('SELECT * FROM treat');
      queryresult.on('row',function(row){
        resultsArray.push(row);
      });//result.onrow
      queryresult.on('end',function(){
        done();
        res.send(resultsArray);
      });//. onend function
  }
});//pg.connect
});//app.get
app.post('/treats', function(req, res){
  console.log('treats post route hit');
  var data = req.body;
  pg.connect(connectionString, function(err, client, done){

  if(err){console.log('this is the err -------->',err);}
  else {
    console.log('in else');

    client.query('INSERT INTO treat (name, description,pic) VALUES ($1,$2,$3)',[data.name,data.description,data.url]);
        res.sendStatus(202);
  }//else
});//pg.connect
});//app.post
