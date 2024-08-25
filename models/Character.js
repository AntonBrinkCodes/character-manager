const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: String,  // e.g., "Spell Slot" or "Other Resource"
  level: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9], required: false },
  quantity: Number,
  resetsOn: { type: String, enum: ['Long Rest', 'Short Rest'] }
});

const characterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  healthPoints: Number,
  resources: [resourceSchema]
});

module.exports = mongoose.model('Character', characterSchema);
