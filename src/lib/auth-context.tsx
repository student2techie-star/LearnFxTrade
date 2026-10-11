'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from './types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role?: 'student' | 'admin') => Promise<void>;
  register: (name: string, email: string, phone?: string) => Promise<void>;
  logout: () => void;
  isEnrolled: (courseId: string) => boolean;
  refreshEnrollments: () => Promise<void>;
  enrolledCourseIds: string[];
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isEnrolled: () => false,
  refreshEnrollments: async () => {},
  enrolledCourseIds: [],
});

// Safe storage helper that protects against SecurityError / blocked third-party storage / incognito restrictions
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      // Storage access blocked or restricted by browser
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      // Ignore if quota exceeded or storage blocked
    }
  },
  removeItem: (key: string) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      // Ignore
    }
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount safely
  useEffect(() => {
    try {
      const stored = safeStorage.getItem('learnfx_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } else {
        // Default initial mock logged-in state as student for instant preview capability
        const defaultUser: User = {
          id: 'user-demo-student',
          name: 'Rahul Sharma (Demo)',
          email: 'student@example.com',
          phone: '+91 98111 22334',
          role: 'student',
          createdAt: new Date().toISOString(),
        };
        setUser(defaultUser);
        safeStorage.setItem('learnfx_user', JSON.stringify(defaultUser));
      }
    } catch (e) {
      // Fallback in-memory
      setUser({
        id: 'user-demo-student',
        name: 'Rahul Sharma (Demo)',
        email: 'student@example.com',
        phone: '+91 98111 22334',
        role: 'student',
        createdAt: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshEnrollments = async () => {
    if (!user) {
      setEnrolledCourseIds([]);
      return;
    }
    try {
      const res = await fetch(`/api/user/enrollments?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setEnrolledCourseIds(data.courseIds || []);
      }
    } catch (e) {
      console.error('Error fetching enrollments:', e);
    }
  };

  useEffect(() => {
    if (user) {
      refreshEnrollments();
    } else {
      setEnrolledCourseIds([]);
    }
  }, [user]);

  const login = async (email: string, role: 'student' | 'admin' = 'student') => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      safeStorage.setItem('learnfx_user', JSON.stringify(data.user));
      await refreshEnrollments();
    } else {
      throw new Error('Login failed');
    }
  };

  const register = async (name: string, email: string, phone?: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone }),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      safeStorage.setItem('learnfx_user', JSON.stringify(data.user));
      await refreshEnrollments();
    } else {
      const err = await res.json();
      throw new Error(err.error || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setEnrolledCourseIds([]);
    safeStorage.removeItem('learnfx_user');
  };

  const isEnrolled = (courseId: string) => {
    if (user?.role === 'admin') return true; // Admins have master access
    return enrolledCourseIds.includes(courseId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isEnrolled,
        refreshEnrollments,
        enrolledCourseIds,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
