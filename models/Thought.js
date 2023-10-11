const { Schema, model } = require('mongoose');

// new reaction schema created
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    },
    username: {
      type: String,
      required: true
    }
  });

//  thought schema created 
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
      type: String,
      required: true
    },
    reactions:
      [reactionSchema],
  },
  {
    toJSON: {
      getters: true
    },
    id: false,
  });

  // formats date
function formatDate(createdAt) {
  const newDate = new Date(createdAt);
  const stringDate = newDate.toLocaleString();

  return stringDate;
};

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

//  Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
