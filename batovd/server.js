var express = require('express')
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'})
var bodyParser = require('body-parser');
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_batovd',
  password        : '1332',
  database        : 'cs290_batovd'
});

module.exports.pool = pool;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5555);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('public'));

app.get('/',function(req,res){
  pool.query("CREATE TABLE IF NOT EXISTS todo", function(err){
    var createString = "CREATE TABLE todo(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "reps BOOLEAN," +
    "weight INTEGER,"+
    "date DATE," +
    "unit INTEGER)";
    if(err)
    {
      console.log("error");
    }
  });
    res.render('home');
});
app.post('/', function(req,res){
    if(req.body["requestType"] === "update")
    {
      console.log("Update");
      let context = {};
        pool.query('SELECT * FROM todo', function(err, rows, fields){
          if(err){
            console.log("Error in selecting");
            return;
          }
          context = JSON.stringify(rows);
          console.log(context);
          res.send(context);
        });
    }
    else if (req.body["requestType"] === "add"){
      var message = [[req.body.name,req.body.reps, req.body.weight,req.body.date, req.body.unit]];
      if(req.body.name === '' ){
        return;
      }
      pool.query("INSERT INTO todo (name ,reps ,weight ,date ,unit) VALUES ?", [message], function(err, result){
        if(err){
          console.log(err);
          return;
        }
        let context = {};
        pool.query('SELECT * FROM todo', function(err, rows, fields){
          if(err){
            console.log("Error in selecting");
            return;
          }
          context = JSON.stringify(rows);
          console.log(context);
          res.send(context);
        });
      });
    }
    else if (req.body["requestType"] === "delete"){
      console.log("DELETE " + req.body.id);
      id = 'DELETE FROM todo WHERE id=' + req.body.id;
      pool.query(id, function(err, result){
        if(err){
          console.log(err);
          return;
        }
        let context = {};
            pool.query('SELECT * FROM todo', function(err, rows, fields){
              if(err){
                console.log("Error in selecting");
                return;
              }
              context = JSON.stringify(rows);
              console.log(context);
              res.send(context);
            });
      })
    }
    else if (req.body["requestType"] === "edit"){
      console.log("EDIT " + req.body.id + " "+ req.body.name);
      pool.query("SELECT * FROM todo WHERE id=?", [req.body.id], function(err, result){
        if(err){
          return;
        }
        if(result.length == 1){
          var curVals = result[0];
          pool.query("UPDATE todo SET name=?, reps=?, weight=?, date=?, unit=? WHERE id=? ",
            [req.body.name || curVals.name, req.body.reps || curVals.reps, req.body.weight || curVals.weight, req.body.date || curVals.date, req.body.unit || curVals.unit, req.body.id],
            function(err, result){
            if(err){
              console.log("Error while Updating");
              console.log(err);
              return;
            }
            let context = {};
            pool.query('SELECT * FROM todo', function(err, rows, fields){
              if(err){
                console.log("Error in selecting");
                return;
              }
              context = JSON.stringify(rows);
              console.log(context);
              res.send(context);
            });
          });
        }
      });
    }
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
