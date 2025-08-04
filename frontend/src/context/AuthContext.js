import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const { data } = await axios.get('/api/check-auth');
                if (data.isAuthenticated) {
                    setUser(data.user);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkLoggedIn();
    }, []);

    const login = async (username, password) => {
        const { data } = await axios.post('/api/login', { username, password });
        setUser(data.user);
        return data;
    };

    const register = async (username, email, password) => {
        const { data } = await axios.post('/api/register', { username, email, password });
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        await axios.post('/api/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};