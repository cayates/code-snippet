const mongoose = require('mongoose')
const Snippets = require('./model')
mongoose.Promise = require('bluebird')
const url = 'mongodb://localhost:27017/codesnippetdb'
// const { User, Snippet } = require('./model.js');

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
    return Snippets.findOne({'tags': tagName}).catch(function(err){
      console.log(err)
    })
  }



module.exports = { getAllSnippets: getAllSnippets, addSnippet: addSnippet, getSnippetById: getSnippetById, deleteSnippet: deleteSnippet, editSnippet: editSnippet, getSnippetByTagName: getSnippetByTagName }