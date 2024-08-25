// src/app/auth/LoginForm.js
"use client";
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Giriş Yapıldı', { username, password });
        // Giriş işlemleri burada yapılacak
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
        </Box>
    );
};

export default LoginForm;
