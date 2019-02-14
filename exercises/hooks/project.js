const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  org: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'org',
    required: true
  },
  dueOn: Date,
  budget: {
    type: Number,
    default: 0
  },
  spent: {
    type: Number,
    default: 0
  },
  onTrack: {
    type: Boolean,
    default: false
  }
})

projectSchema.index({ name: 1 })
projectSchema.virtual('budgetLeft')
  .get(function() {
    return (this.budget - this.spent)
  })

module.exports = mongoose.model('project', projectSchema)
