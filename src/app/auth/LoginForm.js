// src/app/auth/LoginForm.js
"use client";

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation'; // Next.js yönlendirme hook'u

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // Giriş kontrolünü simüle ediyoruz, bu kısımda API çağrısı yapılabilir.
        if (username === 'testuser' && password === '1234') {
            // Giriş başarılıysa Dashboard sayfasına yönlendirin
            router.push('/dashboard');
        } else {
            console.log('Yanlış kullanıcı adı veya şifre');
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
        </Box>
    );
};

export default LoginForm;
