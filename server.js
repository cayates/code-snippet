const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const snippets = require('./snippetdata')
const app = express()
const snippetdal = require('./dal')
const jwt = require('jsonwebtoken')
const session = require('express-session')
// const { createToken, ensureAuthentication } = require('./helpers.js')


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

app.get('/', function (req, res){
  res.redirect('/login')
})

app.get('/login', function(req, res){
  res.render('login')
})

app.get('/main', function(req, res){
  const allSnippets = snippetdal.getAllSnippets().then(function(snippetsLoad){
    res.render('main', { snippetsLoad })
    console.log(snippetsLoad)    
  })
})

app.get('/addsnippet', function(req, res){
  res.render('addsnippet')
})

app.post ('/main', function (req, res){
  snippetdal.addSnippet(req.body.title, req.body.body, req.body.notes, req.body.language, req.body.tags);
  res.redirect('./main')
})

app.get('/singlesnippet/:id', (req, res) => {
  snippetdal.getSnippetById(req.params.id).then(function(snippetLoad){
    res.render('./singlesnippet', {snippetLoad})
  })
})

app.get('/deletesnippet/:id', (req, res) => {
  snippetdal.deleteSnippet(req.params.id)
    res.render('./main')
  })

app.post('/deletesnippet/:id', (req, res) =>{
  snippetdal.deleteSnippet(req.params.id)
    res.redirect('/main')    
  })

app.get('/editsnippet/:id', (req, res) => {
  const editSnippet = snippetdal.getSnippetById(req.params.id).then(function(snippetLoad){
    res.render('./editsnippet', { snippetLoad })    
  })
  })

  app.post('/editsnippet/:id', (req, res) =>{
    snippetdal.editSnippet(req.params.id, req.body)
    res.redirect('/main')
  })

  app.get('/snippetsbytag', (req, res) => {
    const snippetByTag = snippetdal.getSnippetByTagName(req.params.tags).then(function(snippetLoad){
      res.render('./snippetsbytag', { snippetLoad })    
    })
    })
  
    app.post('/snippetsbytag', (req, res) =>{
      snippetdal.getSnippetByTagName(req.params.tags, req.body)
      res.redirect('/snippetsbytag')
    })

app.get('/html', function (req, res){
  res.render('html')
})

app.get('/css', function (req, res){
  res.render('css')
})

app.get('/javascript', function (req, res){
  res.render('javascript')
})

app.get('/createaccount', function (req, res){
  res.render('createaccount')
})

app.get('/logout', function (req, res){
  res.redirect('/login')
})

app.get('/createdaccount', function (req, res){
  res.render('createdaccount')
})

app.post('/createdaccount', function (req, res){
  res.redirect('/createdaccount')
})