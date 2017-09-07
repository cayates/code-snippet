const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const url = 'mongodb://localhost:27017/codesnippetdb'
const { Snippets, User } = require('./model');

mongoose.connect('mongodb://localhost:27017/codesnippetdb', {
  useMongoClient: true
})

function getUserById(userId) {
	return User.find({ '_id': userId });
}

function getSnippetByUser(getUserById){
  return User.findOne({ '_id': getUserById })
  .populate('snippets')
}

function getAllSnippets(){
    return Snippets.find().populate('User')
}

function addSnippet (title, body, notes, language, tags){
    Snippets.create({title: title, body: body, notes: notes, language: language, tags: tags}
)}

function getSnippetById(snippetId){
    return Snippets.findOne({'_id': snippetId}).catch(function(err){
    })
}

function deleteSnippet (snippetId) {
    Snippets.deleteOne({'_id': snippetId}).catch(function(err){
    })
  }

function editSnippet(snippetId, updatedSnippet){
  Snippets.findOneAndUpdate({'_id': snippetId}, updatedSnippet, {upsert: true}, function(err, doc) {
    })
  }

function getSnippetByTagName(tagName){
  return Snippets.find({'tags': tagName}).catch(function(err){
  })
}

function getSnippetByLanguage(language){
  return Snippets.find({'language': language}).catch(function(err){
  })
}

function createUser(newUser){
  const member = new User(newUser);
  member.save( function(err){
  })
  return Promise.resolve('Success');
}

module.exports = { getAllSnippets: getAllSnippets, addSnippet: addSnippet, getSnippetById: getSnippetById, deleteSnippet: deleteSnippet, editSnippet: editSnippet, createUser: createUser, getSnippetByLanguage: getSnippetByLanguage, getSnippetByTagName: getSnippetByTagName, getUserById: getUserById, getSnippetByUser: getSnippetByUser }