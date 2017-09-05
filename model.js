const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const snippetSchema = new mongoose.Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  notes: { type: String },
  language: { type: String, require: true },
  tags: { type: String, require: true }
})

// const userSchema = new mongoose.Schema({
//   name: String, 
//   location: String,
//   avatar: String,
//   username: String, require: true,
//   password: String, require: true,

//   snippets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Snippet' }],
// })



// userSchema.pre('save', function(next) {
//   const user = this
//   if (!user.isModified('password')) {
//     next()
//   }
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(user.password, salt, function(err, hash) {
//       user.password = hash
//       next()
//     })
//   })
// })

// userSchema.methods.comparePassword = function(pwd, dbPass, done) {
//   bcrypt.compare(pwd, dbPass, (err, isMatch) => {
//     done(err, isMatch)
//   })
// }

snippetSchema.statics.findByTitle = function (name, cb) {
    return this.find({ title: title })
  }
  
const Snippets = mongoose.model('snippets', snippetSchema)
// const User = mongoose.model('user', userSchema);

module.exports = Snippets