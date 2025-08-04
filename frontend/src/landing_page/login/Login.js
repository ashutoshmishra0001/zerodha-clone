import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            window.location.href = 'https://zerodha-clone-dashboard.onrender.com';
        } catch (err) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="container p-5 text-center" style={{minHeight: "70vh"}}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} style={{maxWidth: "400px", margin: "auto"}}>
                {error && <p className="text-danger">{error}</p>}
                <div className="form-group mb-3">
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" placeholder="Username" required />
                </div>
                <div className="form-group mb-3">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
}
export default Login;