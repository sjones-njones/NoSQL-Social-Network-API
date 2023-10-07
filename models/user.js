const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
  const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return re.test(email)
};

// Schema to create User model
const userSchema = new Schema(
  {
   username: {
    type: String,
    unique: true,
    required: true,
    trim: true
   },
   email: {
    type: String,
    required: 'Email address is required',
    unique: true,
    validate: [validateEmail, 'Please use a valid email address'],
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please use a valid email address',
  ],
   },   
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.type.ObjectId, 
        ref: 'user',
      }
    ]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
