'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Permission {
  module: string;
  actions: string[];
}

interface Admin {
  email: string;
  name: string;
  permissions: Permission[];
}

interface AuthContextType {
  admin: Admin | null;
  isLoading: boolean;
  loading: boolean;
  isAuthenticatedAdmin: boolean;
  login: (data: Partial<Admin>) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);

  const clearCookies = useCallback(() => {
    document.cookie.split(';').forEach(cookie => {
      document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
  }, []);

  const clearAuthData = useCallback(() => {
    localStorage.removeItem('admin');
    localStorage.removeItem('admin_token');
    setAdmin(null);
    setIsAuthenticatedAdmin(false);
    if (window.location.pathname.startsWith('/admin/')) {
      router.push('/login');
    }
    clearCookies();
  }, [router, clearCookies]);

  const login = useCallback((data: Partial<Admin>) => {
    const { email, name, permissions } = data;
    if (email && name && permissions) {
      const adminData = { email, name, permissions };
      setAdmin(adminData);
      localStorage.setItem('admin', JSON.stringify(adminData));
      setIsAuthenticatedAdmin(true);
      // router.push('/admin'); // Uncomment if redirect is needed
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await fetch('/api/v1/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
    }
  }, [clearAuthData]);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const adminResponse = await fetch('/api/v1/admin/login', {
        method: 'GET',
        credentials: 'include',
      });

      if (adminResponse.ok) {
        const adminData = await adminResponse.json();
        if (adminData.success && adminData.data) {
          const { email, name, permissions } = adminData.data;
          const adminObj = { email, name, permissions };
          setAdmin(adminObj);
          setIsAuthenticatedAdmin(true);
          localStorage.setItem('admin', JSON.stringify(adminObj));
          return;
        }
      }

      clearAuthData();
    } catch (error) {
      console.error('Auth check error:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthData]);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        setAdmin(parsedAdmin);
        setIsAuthenticatedAdmin(true);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Failed to parse admin data:', error.message);
        }
        localStorage.removeItem('admin');
      }
    }

    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isLoading,
        loading: isLoading,
        isAuthenticatedAdmin,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
