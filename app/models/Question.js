const mongoose = require('mongoose')

const AlternativeSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    correct: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

const QuestionSchema = new mongoose.Schema({
    statement: {type: String, required: true},
    discipline: {
        type: String,
        enum: ["Matemática", "Português", "Ciências"],
        required: true 
    },
    alternative: {
    type: [AlternativeSchema],
    validate: [
      arr => arr.length >= 2,
    ]
    },
    image: {
    url: String,
    nomeOriginal: String
    },
   createdAt: {
     type: Date,
     default: Date.now
  }
});

module.exports = mongoose.model("Question", QuestionSchema);

