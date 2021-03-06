
var http = require('http'),
	express  = require('express'),
	bodyParser   = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');

pg.defaults.ssl = true;
var conString = "postgres://apcjhgmawimhjf:22d3dac6c2101e600f01d782bda1c77093b3b4c0c9869b81477a332d925f368c@ec2-54-225-237-84.compute-1.amazonaws.com:5432/dbd9r1vt6o4jlv";

var express = require('express');
var http = require('http'),
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra');
function permitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  res.header('Access-Control-Allow-Origin', '*'); 
  //metodos http permitidos para CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use(permitirCrossDomain);


app.get('/', function(req, res) {
    res.sendfile('index.html');
});

console.log("Servidor iniciado");
    // escuchar
    app.listen(process.env.PORT || 8080, function(){console.log("the server is running");});

app.get('/listarUsuarios', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
    
        client.query('SELECT * FROM usuario', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
    
            client.end();
            return res.json(result.rows);
            
        });
    });
});
    
//Usuario para actualizar y eliminar
app.get('/mostrarUsuario/:id',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.params.id;

    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuario WHERE id=' + id + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
                client.end();
            return res.json(result.rows);
        
        });
        
    });
});

app.put('/actualizarUsuario',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.body.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("UPDATE usuario SET usuario='"+req.body.usuario+"' WHERE id='" + id + "';", function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
                client.end();
            return res.json(result);
        });
    });
});


app.delete('/eliminarUsuario',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.body.id;

    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
    
        client.query('DELETE FROM usuario WHERE id=' + id + ';', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
                client.end();
            return res.json(result);
        });
    });


});

app.post('/GuardarUsuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        
        console.log("miau "+util.inspect(req,false,null));
        
        client.query("INSERT INTO  usuario  (usuario) VALUES ('"+req.body.usuario+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
        });
        
    });
});

app.post('/guardarRespuesta', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        
        console.log("miau "+util.inspect(req,false,null));
        
        client.query("INSERT INTO  respuestas  (respuesta1,respuesta2,respuesta3) VALUES ('"+req.body.respuesta1+"','"+req.body.respuesta2+"','"+req.body.respuesta3+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
        });
        
    });
});

app.get('/ultimoidusuario',(req,res)=>{
    var client = new pg.Client(conString);
  
    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query('SELECT id from usuario order by id desc LIMIT 1', function(err, result) {
           if(err) {
               return console.error('error running query', err);
           }
          
           //console.log(result);
            client.end();
           return res.json(result.rows);
      
       });
      
   });
    
});