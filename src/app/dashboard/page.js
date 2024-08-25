// src/app/dashboard/page.js
"use client";

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const DashboardPage = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h3">Hoş Geldiniz</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Bu, giriş yaptıktan sonra gördüğünüz Dashboard sayfasıdır.
                </Typography>
                {/* Dashboard içeriği burada olabilir, örneğin kullanıcı bilgileri veya görev listesi */}
            </Box>
        </Container>
    );
};

export default DashboardPage;
