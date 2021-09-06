import {useEffect, useState} from 'react';
import './register.css';
import axios from 'axios';
export default function Register () {
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const [email, setEmail] = useState ('');
  const [error, setError] = useState (false);
  const handleSubmit = async e => {
    e.preventDefault ();
    setError (false);

    try {
      const res = await axios.post ('/api/auth/register', {
        username,
        email,
        password,
      });
      res.data && window.location.replace ('/login');
    } catch (error) {
      setError (true);
    }
  };
  // useEffect(()=>{
  //   handleSubmit();
  // },[])
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          required
          onChange={e => setUsername (e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          required
          onChange={e => setEmail (e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          required
          onChange={e => setPassword (e.target.value)}
        />
        <button className="registerButton" type="submit" >Register</button>
      </form>
      <button className="registerLoginButton">Login</button>
      {error&&<div>{error}</div>}
    </div>
  );
}
