const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('toUpper', (text) =>{
  return  text.toUpperCase();
});
hbs.registerHelper('getDate',() =>{
  return new Date().getFullYear();
});
app.set('view engine', 'hbs');


//while using this if we don't use next() than app won't run
app.use((req,res,next) =>{
    var time = new Date().toString();
    var log = `${time}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) =>{
        if(err){
           console.log('unable to find server.log file');
        }
    });
  next();
});
// app.use((req,res,next) =>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    //  res.send('<h1>hello express</h1>');
    // res.send({
    //     name:'saif',
    //     job:'full stack developer in uk',
    //     cities:['dubai','london','paris']
    // })
    res.render('home.hbs',{
           title:'Welcome to home',
           msg:'hello welcome to the homepage of the website'
    });
});
app.get('/about',(req,res) => {
    // res.send('<h1>About Page</h1>')
    res.render('about.hbs',{
        title: 'About Title',
       
    });
});

app.get('/bad',(req,res) => {
     res.send({
         eroorMessage: 'unable to handle response'
     });
});

app.listen(3000 , () =>{
    console.log('server is up on port 3000')
});