"use client";

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Image from 'next/image';

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
        <Box
            component="form"
            onSubmit={handleSignup}
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
            <Image src="/images/logo.png" alt="Techiz Logo" width={200} height={200} priority />

            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2, color: '#f57c00' }}>
                Kayıt Ol
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Yeni bir hesap oluşturmak için bilgilerinizi girin
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

            {/* Kayıt Ol Butonu */}
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
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
            >
                Kayıt Ol
            </Button>

            {/* Başarı Mesajı */}
            {message && (
                <Typography variant="body2" sx={{ color: 'success.main', mt: 2 }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default SignupForm;
