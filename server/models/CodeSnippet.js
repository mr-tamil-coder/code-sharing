import mongoose from 'mongoose';

const codeSnippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  snippetNumber: {
    type: Number,
    required: true,
    unique: true
  }
}, { timestamps: true });

export default mongoose.model('CodeSnippet', codeSnippetSchema);