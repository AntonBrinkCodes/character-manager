import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CharacterCreation from './pages/CharacterCreation';
import CharacterSheet from './pages/CharacterSheet';
import CharacterCreationPage from './pages/CharacterCreationPage';
import ReactDOM from 'react-dom'
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { all } from '@awesome.me/kit-KIT_CODE/icons'

//library.add(...all)


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CharacterCreationPage />} />
        <Route path="/character" element={<CharacterSheet />} />
      </Routes>
    </Router>
  );
}

export default App;
