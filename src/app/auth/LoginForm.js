"use client";

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            router.push('/dashboard');
        } else {
            setError('Yanlış kullanıcı adı veya şifre');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
                mt: 5,
                p: 4,
                maxWidth: 400,
                mx: 'auto',
                boxShadow: 3,
                borderRadius: 3,
                bgcolor: '#f5f5f5',
                textAlign: 'center',
                backgroundColor: '#ffffff',
            }}
        >
            {/* Logo */}
            <Image src="/images/logo.png" alt="Techiz Logo" width={200} height={200} priority/>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2, color: '#f57c00' }}>
                Hoş Geldiniz!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Devam etmek için lütfen giriş yapın
            </Typography>

            {/* Kullanıcı Adı ve Şifre Alanları */}
            <TextField
                label="Kullanıcı Adı"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#f57c00',
                        },
                        '&:hover fieldset': {
                            borderColor: '#f57c00',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#f57c00',
                        },
                    },
                }}
            />
            <TextField
                label="Şifre"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#f57c00',
                        },
                        '&:hover fieldset': {
                            borderColor: '#f57c00',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#f57c00',
                        },
                    },
                }}
            />

            {/* Giriş Yap Butonu */}
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    mt: 2,
                    py: 1.5,
                    backgroundColor: '#f57c00',
                    '&:hover': {
                        backgroundColor: '#e64a19',
                    },
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                Giriş Yap
            </Button>

            {/* Hata Mesajı */}
            {error && <Typography variant="body2" sx={{ color: 'error.main', mt: 2 }}>{error}</Typography>}
        </Box>
    );
};

export default LoginForm;
