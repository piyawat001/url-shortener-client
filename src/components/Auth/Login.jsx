import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      alert(data.message);

      if (data.message === 'Logged in') {
        onLogin?.();             // เรียก callback ถ้ามี
        navigate('/linkform');   // เปลี่ยนหน้าไป LinkForm
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    }
  };

    return (
    <div className="login-page">
        <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
            <div className="password-wrapper">
            <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <span
                className="show-password-icon"
                onClick={() => setShowPassword(!showPassword)}
            >
                {/* ใส่ icon ตาเปิด/ปิด */}
            </span>
            </div>
            <button type="submit">Login</button>
        </form>

        <button
            type="button"
            className="register-button"
            onClick={() => navigate('/register')}
        >
            Register
        </button>
        </div>
    </div>
    );

}
