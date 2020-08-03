var express = require('express')
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'})
var bodyParser = require('body-parser');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5222)


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('public'));

app.get("/updates", function (req, res) {
   res.render("updates")
})
app.get('/',function(req,res){
    res.render('home');

});
app.get('/team',function(req,res){
    res.render('team');

});
app.get('/download',function(req,res){
    res.render('download');

});
app.post('/subscribe', function(req,res){
    var qParams = [];

    for (let p in req.body){
      qParams.push({'name':p,'value':req.body[p]})
    }
    var context = {};
    context.dataList = qParams;
    console.log(context);
    res.send(context.dataList);
  });
app.use(function(req,res){
    res.status(404);
    res.send('404 - Page not found');
  });
  
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500 - Server is missing');
  });
app.listen(app.get('port'), function(){
})
