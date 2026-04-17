'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, User, LoginData, RegisterData } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = apiService.getToken();
    if (token) {
      // You could validate the token here by making an API call
      // For now, we'll assume it's valid
      setUser({} as User); // You'd need to decode JWT or fetch user data
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response = await apiService.login(data);
      apiService.setToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await apiService.register(data);
      // After registration, you might want to auto-login
      // or redirect to login page
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiService.removeToken();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
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