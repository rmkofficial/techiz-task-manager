// src/app/auth/LoginForm.js
"use client";

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();

        // Yerel depolama bilgilerini kontrol et
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            // Giriş başarılıysa yönlendir
            router.push('/dashboard');
        } else {
            setError('Yanlış kullanıcı adı veya şifre');
        }
    };

    return (
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
                label="Kullanıcı Adı"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Şifre"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Giriş Yap
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Box>
    );
};

export default LoginForm;
