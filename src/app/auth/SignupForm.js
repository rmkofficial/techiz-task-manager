// src/app/auth/SignupForm.js
"use client";

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SignupForm = ({ onSignupSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();

        // Kullanıcı bilgilerini simüle et
        const user = { username, password };

        // Bilgileri localStorage'a kaydet
        localStorage.setItem('user', JSON.stringify(user));

        // Başarı mesajı göster ve giriş formuna geçiş yap
        setMessage('Kayıt başarılı! Giriş yapmak için lütfen Giriş Yap butonuna tıklayın.');
        onSignupSuccess(); // Giriş formuna geçiş yap
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
            {message && <p>{message}</p>}
        </Box>
    );
};

export default SignupForm;
