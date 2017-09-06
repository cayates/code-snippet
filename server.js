// ALL BASIC SETUP

const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const snippets = require('./snippetdata')
const app = express()
const snippetdal = require('./dal')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const { createToken, ensureAuthentication } = require('./helpers.js')
const {User, Snippet} = require('./model')
require('dotenv').config()

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', 3000)

app.use(express.static('public'));

app.use(session({
  secret: 'chads secret',
  resave: false,
  saveUninitialized: true
}))  

app.listen(app.get('port'), function () {
    console.log('App is running on Andre 3000.')
  })

// END BASIC SETUP

// REDIRECT TO LOGIN PAGE RIGHT OFF THE BAT

app.get('/', function (req, res){
  res.redirect('/login')
})

app.get('/login', function(req, res){
  res.render('login')
})

// END REDIRECT 

// POST REQUEST FROM THE FORM SUBMISSION ON THE LOGIN PAGE TO CHECK AUTHENTICATION

app.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, 'username password', function (err, user, next) {
    if (err) return next(err)
    if (!user) {
      return res.status(401).send({ message: 'Wrong info, try again bro.' })
    }
    user.comparePassword(req.body.password, user.password, function ( err, isMatch ) {
      console.log('is match', isMatch)
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong info, try again bro.' })
      }
      let token = { token: createToken(user)};
      req.session.jwtToken = token;
      console.log(token)      
      res.redirect('/main');
    })
  })
})

// END POST REQUEST

// NAV TO MAIN PAGE AND POPULATE ALL SNIPPETS FROM GETALLSNIPPETS FUNCTION
// PASS IN ALL DATA THROUGH 'SNIPPETSLOAD'

app.get('/main', function(req, res){
  const allSnippets = snippetdal.getAllSnippets().then(function(snippetsLoad){
    res.render('main', { snippetsLoad })
    console.log(snippetsLoad)    
  })
})

// GET ADD SNIPPET PAGE AND POST THE NEW SNIPPET TO THE MAIN PAGE ONCE COMPLETE

app.get('/addsnippet', function(req, res){
  res.render('addsnippet')
})

app.post ('/main', function (req, res){
  snippetdal.addSnippet(req.body.title, req.body.body, req.body.notes, req.body.language, req.body.tags);
  res.redirect('./main')
})

// END 

// GET THE SINGLE SNIPPET THAT IS CLICKED ON BY THE _ID FROM MONGOOSE

app.get('/singlesnippet/:id', (req, res) => {
  snippetdal.getSnippetById(req.params.id).then(function(snippetLoad){
    res.render('./singlesnippet', {snippetLoad})
  })
})

// END

// DELETE THE SINGLE POST BY _ID FROM MONGOOSE ONCE THE FORM IS SUBMITTED

app.post('/deletesnippet/:id', (req, res) =>{
  snippetdal.deleteSnippet(req.params.id)
    res.redirect('/main')    
  })

// END

// EDIT SNIPPET BY THE _ID FROM MONGOOSE, PASSING IN DATA THROUGH SNIPPETLOAD

app.get('/editsnippet/:id', (req, res) => {
  const editSnippet = snippetdal.getSnippetById(req.params.id).then(function(snippetLoad){
    res.render('./editsnippet', { snippetLoad })    
  })
  })

app.post('/editsnippet/:id', (req, res) =>{
  snippetdal.editSnippet(req.params.id, req.body)
  res.redirect('/main')
})

// END 

// END SNIPPETS BY TAG NAME

// LOGOUT PAGE TO REDIRECT BACK TO LOGIN

app.get('/logout', function (req, res){
  res.redirect('/login')
})

// CREATING AN ACCOUNT

app.get('/createaccount', function (req, res){
  res.render('createaccount')
})

app.get('/createdaccount', function (req, res){
  res.render('createdaccount')
})

app.post('/createdaccount', (req, res) => {
  snippetdal.createUser(req.body).then((newUser) => {
    res.redirect('/createdaccount')    
  })
})

// END

// TO VIEW ALL OF YOUR SNIPPET POSTS

app.get('/viewsnippets', function (req, res){
  res.render('viewsnippets')
})

// SNIPPETS BY LANGUAGE MAIN PAGE

app.get('/snippetsbylanguage', function (req, res){
    res.render('snippetsbylanguage')    
  })


// SNIPPETS BY SPECIFIC LANGUAGE

app.get('/html', function (req, res){
  snippetdal.getSnippetByLanguage('HTML').then((snippetsLoad)=>{
    res.render('html',{ snippetsLoad })    
  }) 
})

app.get('/css', function (req, res){
  snippetdal.getSnippetByLanguage('CSS').then((snippetsLoad)=>{
    res.render('css',{ snippetsLoad })    
  }) 
})

app.get('/javascript', function (req, res){
  snippetdal.getSnippetByLanguage('Javascript').then((snippetsLoad)=>{
    res.render('javascript',{ snippetsLoad })    
  }) 
})

// END SNIPPETS BY LANGUAGE

// SNIPPETS BY TAG NAME

app.get('/snippetsbytag', (req, res) => {
     res.render('snippetsbytag')    
  })

  app.get('/functionality', function (req, res){
    snippetdal.getSnippetByTagName('Functionality').then((snippetsLoad)=>{
      res.render('functionality',{ snippetsLoad })    
    }) 
  })
  
  app.get('/styling', function (req, res){
    snippetdal.getSnippetByTagName('Styling').then((snippetsLoad)=>{
      res.render('styling',{ snippetsLoad })    
    }) 
  })
  
  app.get('/markup', function (req, res){
    snippetdal.getSnippetByTagName('Markup').then((snippetsLoad)=>{
      res.render('markup',{ snippetsLoad })    
    }) 
  })