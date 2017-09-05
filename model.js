const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const snippetSchema = new mongoose.Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  notes: { type: String },
  language: { type: String, require: true },
  tags: { type: String, require: true }
})

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  location: { type: String, require: true },
  avatar: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true }
})

userSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) {
    next()
  }
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash
      console.log(hash)
      next()
    })
  })
})

userSchema.methods.comparePassword = function(pwd, dbPass, done) {
  bcrypt.compare(pwd, dbPass, (err, isMatch) => {
    done(err, isMatch)
  })
}

snippetSchema.statics.findByTitle = function (name, cb) {
    return this.find({ title: title })
  }
  
const Snippets = mongoose.model('snippets', snippetSchema)
const User = mongoose.model('user', userSchema);

module.exports = { Snippets, User }