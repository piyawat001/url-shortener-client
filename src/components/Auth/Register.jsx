import { useState } from 'react';
import './Register.css';

export default function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await onRegister(username, password);
    alert(res.message);
    if (!res.message.includes('exists')) onRegister();
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
