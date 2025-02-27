import React, { useState, useEffect } from 'react';
import '../assets/Login.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [userIdFromUrl, setUserIdFromUrl] = useState(null);

  useEffect(() => {
    // Fonction pour extraire les paramètres de l'URL
    const getParamsFromUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const userId = searchParams.get('userId');
      if (userId) {
        setUserIdFromUrl(userId);
      }
    };
    getParamsFromUrl();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    const formData = {
      email: mail,
      password: password
    };

    axios.post('http://localhost:3005/login', formData)
      .then(response => {
        const { token, role, redirectUrl } = response.data;
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode(token);
        const userId = userIdFromUrl || decodedToken.userId; // Utilisation de l'ID utilisateur de l'URL s'il est disponible, sinon de celui du token
        const userIdd = decodedToken.userId;
        
        if (role === 'medecin') {
          window.location.href = redirectUrl + `?userId=${userId}`;
        } 
      })
      .catch(error => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          setError({ ...newErrors, apiError: errorMessage });
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div className="bg-img">
      <div className="content">
        <header>Login Form</header>
        {error.apiError && <div className="error-message">{error.apiError}</div>}
        <form action="post" onSubmit={handleSubmit}>
          <div className={`field ${error ? 'error' : ''}`}>
            <span className="fa fa-user"></span>
            <input type="text" required placeholder="Email or Phone" onChange={(e) => setMail(e.target.value)} value={mail} />
          </div>
          <div className={`field space ${error ? 'error' : ''}`}>
            <span className="fa fa-lock"></span>
            <input type="password" className="pass-key" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="new-password" />
           
          </div>
        
          <div className="field">
            <input type="submit" value="LOGIN" />
          </div>
        </form>
       
       
        <div className="signup">
          Don't have an account?
          <a href="/signup">Signup Now</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
