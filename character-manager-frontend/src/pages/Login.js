import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Import a CSS file for styling

const backendURL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated by making a request to your backend
    fetch('/auth/current_user')
      .then(response => response.json())
      .then(data => {
        if (data) {
          navigate('/create');
        }
      });
  }, [navigate]);

  const handleLogin = () => {
    console.log(backendURL)
    //window.open(`${backendURL}/auth/google`, '_self');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Welcome to Character Manager</h2>
        <p className="login-description">Log in to start managing your characters effortlessly.</p>
        <button className="login-button" onClick={handleLogin}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
