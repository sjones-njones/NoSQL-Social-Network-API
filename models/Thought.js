const { Schema, model } = require('mongoose');

// Schema to create User model
const thoughtSchema = new Schema(
  {
   thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
   },
   createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate
    },  
    username: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    reactions: 
      [reactionSchema],
     },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
  );

  function formatDate(createdAt) {
   const newDate = new Date(createdAt);
   const stringDate = newDate.toLocaleString();
  
   return stringDate;
  }
  
  // Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
