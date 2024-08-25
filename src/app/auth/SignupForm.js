// src/app/auth/SignupForm.js
"use client";
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        console.log('Kayıt Yapıldı', { username, password });
        // Kayıt işlemleri burada yapılacak
    };

    return (
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
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
                Kayıt Ol
            </Button>
        </Box>
    );
};

export default SignupForm;
