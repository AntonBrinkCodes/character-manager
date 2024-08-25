import React, { useState } from 'react';

const CharacterSheet = ({ character, onUpdate }) => {
  const [healthPoints, setHealthPoints] = useState(character.healthPoints);
  const [resources, setResources] = useState(character.resources);

  const handleDamage = (damage) => {
    const newHealth = Math.max(healthPoints - damage, 0);
    setHealthPoints(newHealth);
    onUpdate({ ...character, healthPoints: newHealth });
  };

  const handleHeal = (heal) => {
    const newHealth = Math.min(healthPoints + heal, character.maxHealthPoints);
    setHealthPoints(newHealth);
    onUpdate({ ...character, healthPoints: newHealth });
  };

  const expendResource = (index) => {
    const newResources = [...resources];
    if (newResources[index].quantity > 0) {
      newResources[index].quantity -= 1;
      setResources(newResources);
      onUpdate({ ...character, resources: newResources });
    }
  };

  const resetResources = (type) => {
    const newResources = resources.map((resource) => {
      if (type === 'Long Rest' && (resource.resetsOn === 'Long Rest' || resource.resetsOn === 'Short Rest')) {
        return { ...resource, quantity: resource.maxQuantity };
      }
      if (type === 'Short Rest' && resource.resetsOn === 'Short Rest') {
        return { ...resource, quantity: resource.maxQuantity };
      }
      if (type === 'Dawn' && resource.resetsOn === 'Dawn') {
        return { ...resource, quantity: resource.maxQuantity };
      }
      return resource;
    });
    setResources(newResources);
    onUpdate({ ...character, resources: newResources });
  };

  return (
    <div className="character-sheet">
      <h1>{character.name}</h1>
      <div className="health">
        <button onClick={() => handleDamage(1)} style={{ backgroundColor: 'red' }}>Damage</button>
        <span>HP: {healthPoints}</span>
        <button onClick={() => handleHeal(1)} style={{ backgroundColor: 'green' }}>Heal</button>
      </div>
      <div className="resources">
        {resources.map((resource, index) => (
          <div key={index} className="resource">
            <span>{resource.type} {resource.level ? `Lvl ${resource.level}` : ''}: {resource.quantity}</span>
            <button onClick={() => expendResource(index)}>Expend</button>
          </div>
        ))}
      </div>
      <div className="rest-buttons">
        <button onClick={() => resetResources('Short Rest')}>Short Rest</button>
        <button onClick={() => resetResources('Long Rest')}>Long Rest</button>
        <button onClick={() => resetResources('Dawn')}>Dawn</button>
      </div>
    </div>
  );
};

export default CharacterSheet;
