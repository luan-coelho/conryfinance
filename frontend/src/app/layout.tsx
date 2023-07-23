import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '@/app/components/Layout/Sidebar';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerHeader from '@/app/components/Layout/DrawerHeader';

export const metadata: Metadata = {
  title: 'Confy Finance App',
  description: 'App for finances'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
