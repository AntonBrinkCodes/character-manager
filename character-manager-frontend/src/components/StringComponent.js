const StringInput = ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
};

export default StringInput;