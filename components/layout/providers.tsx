'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { AuthContextProvider } from '@/context/auth-context';
import { PatientProvider } from '@/context/patient-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthContextProvider>
          <PatientProvider>
            {children}
          </PatientProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}
