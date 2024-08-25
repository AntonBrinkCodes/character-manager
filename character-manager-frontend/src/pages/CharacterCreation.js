import React, { useState } from 'react';
import axios from 'axios';
import '../styles/characterCreation.css'; // Import a CSS file for styling

const backendURL = process.env.REACT_APP_BACKEND_URL;

const CharacterCreation = ({ userId, onCharacterCreated }) => {
  const [name, setName] = useState('');
  const [healthPoints, setHealthPoints] = useState(10);
  const [resources, setResources] = useState([]);
  const [spellSlotLevel, setSpellSlotLevel] = useState(1);
  const [spellSlotQuantity, setSpellSlotQuantity] = useState(0);

  const addResource = (type, level, quantity, resetsOn) => {
    setResources([...resources, { type, level, quantity, resetsOn, maxQuantity: quantity }]);
  };

  const handleAddSpellSlot = () => {
    addResource('Spell Slot', spellSlotLevel, spellSlotQuantity, 'long rest');
    setSpellSlotLevel(1);
    setSpellSlotQuantity(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/api/characters/create`, {
        userId,
        name,
        healthPoints,
        resources
      });
      onCharacterCreated(response.data);
    } catch (err) {
      console.error('Failed to create character', err);
    }
  };

  return (
    <div className="character-creation">
      <h2>Create Character</h2>
      <form onSubmit={handleSubmit} className="creation-form">
        <div className="form-group">
          <label htmlFor="name">Character Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Character Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="healthPoints">Health Points</label>
          <input
            id="healthPoints"
            type="number"
            value={healthPoints}
            onChange={(e) => setHealthPoints(e.target.value)}
            placeholder="Health Points"
            required
          />
        </div>

        <div className="resources-section">
          <h3>Spell Slots</h3>
          <div className="form-group">
            <label htmlFor="spellSlotLevel">Level</label>
            <input
              id="spellSlotLevel"
              type="number"
              value={spellSlotLevel}
              min="1"
              max="9"
              onChange={(e) => setSpellSlotLevel(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="spellSlotQuantity">Quantity</label>
            <input
              id="spellSlotQuantity"
              type="number"
              value={spellSlotQuantity}
              onChange={(e) => setSpellSlotQuantity(Number(e.target.value))}
            />
          </div>

          <button type="button" onClick={handleAddSpellSlot}>
            Add Spell Slot
          </button>

          <ul className="resource-list">
            {resources.map((resource, index) => (
              <li key={index}>
                {resource.type} (Level: {resource.level}, Quantity: {resource.quantity})
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Create Character</button>
      </form>
    </div>
  );
};

export default CharacterCreation;
