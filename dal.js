const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const url = 'mongodb://localhost:27017/codesnippetdb'
const { Snippets, User } = require('./model');

mongoose.connect('mongodb://localhost:27017/codesnippetdb', {
  useMongoClient: true
})

function getAllSnippets () {
    return Snippets.find()
  }

function addSnippet (title, body, notes, language, tags){
    Snippets.create({title: title, body: body, notes: notes, language: language, tags: tags}
)}

function getSnippetById(snippetId){
    return Snippets.findOne({'_id': snippetId}).catch(function(err){
      console.log(err)
    })
}

function deleteSnippet (snippetId) {
    Snippets.deleteOne({'_id': snippetId}).catch(function(err){
      console.log(err)    
    })
  }

function editSnippet(snippetId, updatedSnippet){
  Snippets.findOneAndUpdate({'_id': snippetId}, updatedSnippet, {upsert: true}, function(err, doc) {
    })
  }

function getSnippetByTagName(tagName){
  return Snippets.find({'language': tagName}).catch(function(err){
  console.log(err)
  })
}

function createUser(newUser){
  const member = new User(newUser);
  member.save( function(err){
    console.log(err);
    console.log(member)
  })
  console.log('congratulations, new user has been created');
  return Promise.resolve('Success');
}

module.exports = { getAllSnippets: getAllSnippets, addSnippet: addSnippet, getSnippetById: getSnippetById, deleteSnippet: deleteSnippet, editSnippet: editSnippet, getSnippetByTagName: getSnippetByTagName, createUser: createUser }