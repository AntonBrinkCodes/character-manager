// routes/schemaRoutes.js
const express = require('express');
const Character = require('../models/Character');

const router = express.Router();

router.get('/character/schema', (req, res) => {
  try {
    const schemaPaths = Character.schema.paths;
    const schemaInfo = {};

    for (const [path, schemaType] of Object.entries(schemaPaths)) {
      schemaInfo[path] = {
        type: schemaType.instance, // Type of the field (String, Number, etc.)
        required: schemaType.options.required || false, // Whether the field is required
      };
    }

    res.json(schemaInfo); // Send simplified schema info as JSON
  } catch (error) {
    console.error('Error fetching schema:', error);
    res.status(500).json({ error: 'Failed to fetch schema information' });
  }
});

module.exports = router;
