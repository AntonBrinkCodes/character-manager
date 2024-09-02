import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DynamicForm = () => {
  const [schema, setSchema] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
        const response = await axios.get(`${backendURL}/api/schema/character/schema`);
        setSchema(response.data);
      } catch (err) {
        console.error('Error fetching schema:', err);
        setError('Failed to fetch schema');
      } finally {
        setLoading(false);
      }
    };

    fetchSchema();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
      await axios.post(`${backendURL}/api/characters/create`, formData);
      alert('Character created successfully!');
    } catch (err) {
      console.error('Error creating character:', err);
      alert('Failed to create character');
    }
  };

  if (loading) return <p>Loading form schema...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(schema).map(([key, value]) => (
        <div key={key}>
          <label>
            {key}: 
            <input
              type={value.type === 'Number' ? 'number' : 'text'}
              name={key}
              onChange={handleChange}
              required={value.required || false}
            />
          </label>
        </div>
      ))}
      <button type="submit">Create Character</button>
    </form>
  );
};

export default DynamicForm;
