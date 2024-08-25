// src/app/dashboard/page.js
"use client";

import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/'); // Oturum yoksa giriş sayfasına yönlendir
        }
    }, [router]); // 'router' değişkenini bağımlılık dizisine ekledik

    const handleLogout = () => {
        // Oturum bilgisini temizle (çıkış yap)
        localStorage.removeItem('isLoggedIn');

        // Giriş sayfasına yönlendir
        router.push('/');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h3">Hoş Geldiniz</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Bu, giriş yaptıktan sonra gördüğünüz Dashboard sayfasıdır.
                </Typography>
                <Button onClick={handleLogout} variant="contained" color="primary" sx={{ mt: 4 }}>
                    Çıkış Yap
                </Button>
            </Box>
        </Container>
    );
};

export default DashboardPage;
