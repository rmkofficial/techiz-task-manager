// src/app/dashboard/page.js
"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('username');

        if (!isLoggedIn) {
            router.push('/'); // Oturum yoksa giriş sayfasına yönlendir
        } else {
            setUsername(storedUsername || 'Kullanıcı'); // Oturum açıksa kullanıcı adını ayarla
        }
    }, [router]);

    const handleLogout = () => {
        // Oturum bilgisini temizle (çıkış yap)
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        router.push('/');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
                <Typography variant="h3">Dashboard</Typography>
                <Typography variant="h4" sx={{ mt: 2 }}>
                    Hoş Geldin, {username}!
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Bu, giriş yaptıktan sonra gördüğünüz Dashboard sayfasıdır.
                </Typography>

                <Typography variant="h5" sx={{ mt: 4 }}>
                    Toplam Tamamlanan Görev Sayısı: 10
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button variant="outlined" sx={{ mx: 1 }}>
                        Profil Düzenle
                    </Button>
                    <Button variant="outlined" sx={{ mx: 1 }}>
                        Yeni Görev Ekle
                    </Button>
                </Box>

                <Button onClick={handleLogout} variant="contained" color="primary" sx={{ mt: 4 }}>
                    Çıkış Yap
                </Button>
            </Box>
        </Container>
    );
};

export default DashboardPage;
