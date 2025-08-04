import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(username, email, password);
           window.location.href = 'https://zerodha-clone-dashboard-79yj.onrender.com';
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed. Username or email may be taken.');
        }
    };

    return (
        <div className="container p-5 text-center" style={{minHeight: "70vh"}}>
            <h1>Open a Zerodha account</h1>
            <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
            <form onSubmit={handleSubmit} style={{maxWidth: "400px", margin: "auto"}}>
                {error && <p className="text-danger">{error}</p>}
                 <div className="form-group mb-3">
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" placeholder="Username" required />
                </div>
                <div className="form-group mb-3">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required />
                </div>
                <div className="form-group mb-3">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign up Now</button>
            </form>
        </div>
    );
}
export default Signup;
