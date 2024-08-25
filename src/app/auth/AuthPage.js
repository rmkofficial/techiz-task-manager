// src/app/auth/AuthPage.js
"use client";

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Container, Typography, Box } from '@mui/material';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
        setIsLogin((prevMode) => !prevMode);
    };

    // Kayıt başarılı olduğunda giriş formuna geçiş yapmak için bir fonksiyon
    const handleSignupSuccess = () => {
        setIsLogin(true); // Giriş formuna geçiş yap
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h4">
                    {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                </Typography>
                {isLogin ? (
                    <LoginForm />
                ) : (
                    <SignupForm onSignupSuccess={handleSignupSuccess} />
                )}
                <Box mt={2}>
                    <Typography variant="body1">
                        {isLogin ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="primary"
                        onClick={toggleAuthMode}
                        sx={{ cursor: 'pointer' }}
                    >
                        {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default AuthPage;
