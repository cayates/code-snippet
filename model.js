const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  notes: { type: String },
  language: { type: String, require: true },
  tags: { type: String, require: true }
})

snippetSchema.statics.findByTitle = function (name, cb) {
    return this.find({ title: title })
  }
  
const Snippets = mongoose.model('snippets', snippetSchema)

module.exports = Snippets