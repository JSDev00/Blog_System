const mongoose = require ('mongoose');
const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new mongoose.Schema (
  {
    username: {type: String, required: true, unique: true, minLength: 6},
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    
    },
    password: {type: String, required: true},
    profilePic: {type: String, default: ''},
  },
  {timestamps: true}
);

module.exports = mongoose.model ('User', UserSchema);
