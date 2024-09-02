const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: String,  // e.g., "Spell Slot" or "Other Resource"
  level: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9], required: false },
  quantity: Number,
  resetsOn: { type: String, enum: ['Long Rest', 'Short Rest'] }
});

const feature = new moongose.Schema({
  name: String,
  requirement: String,
  effect: String,
  source_reference: String,
});

const subclassSchema = new moongose.Schema({
  name: String,
  level: Number,
  features: [feature],
  source_reference: String,
});

const classSchema = new moongose.Schema({
  class: String,
  level: Number,
  features: [feature],
  subclass: subclassSchema,
  multiclass_requirement: String,
  source_reference: String,
});

const abilityScore = new moongose.Schema({
  name: String,
  score: Number,
  proficiency: Boolean,
});

const skill = new moongose.Schema({
  abilityscore: abilityScore,
  proficiency: Boolean,
});

const Background = new moongose.Schema({
  name: String,
  features: [feature],
  skills: [skill],
  description: String,
  source_reference: String,
  languages: [String]
});

const Race = new moongose.Schema({
  name: String,
  source_reference: String,
  features: [feature],
  skills: [skill],
  description: String,
  size: {type: String, enum: ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"]}
});

const characterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  healthPoints: Number,
  armorClass: Number,
  background: Background,
  race: Race,
  resources: [resourceSchema],
  class: classSchema,
  multiClasses: [classSchema],
  
  abilityScores: [abilityScore],
  skills: [skill],
  items: [String],

});

module.exports = mongoose.model('Character', characterSchema);
