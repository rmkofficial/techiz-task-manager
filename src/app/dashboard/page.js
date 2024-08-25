// src/app/dashboard/page.js
"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import TaskManager from '../../components/TaskManager'; // Yeni eklenen bileşeni içe aktar

const DashboardPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('username');

        if (!isLoggedIn) {
            router.push('/'); // Oturum yoksa giriş sayfasına yönlendir
        } else {
            setUsername(storedUsername || 'Kullanıcı'); // Kullanıcı adı ayarla
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
                <TaskManager /> {/* Görev Yönetimi Bileşeni */}
                <Box sx={{ mt: 4 }}>
                    <Button variant="contained" color="primary" onClick={handleLogout}>
                        Çıkış Yap
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default DashboardPage;
