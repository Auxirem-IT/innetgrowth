"use client";

import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const storedAuth = localStorage.getItem('mock-auth-v1') === 'true';
    const storedRedirect = localStorage.getItem('mock-intent-v1');
    
    setIsAuthenticated(storedAuth);
    setPendingRedirect(storedRedirect || null);
    setIsHydrated(true);

    console.log('[Auth] Hydrated from localStorage:', {
      isAuthenticated: storedAuth,
      pendingRedirect: storedRedirect,
    });
  }, []);

  // Persist auth state to localStorage
  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;
    
    localStorage.setItem('mock-auth-v1', isAuthenticated ? 'true' : 'false');
    console.log('[Auth] Persisted isAuthenticated:', isAuthenticated);
  }, [isAuthenticated, isHydrated]);

  // Persist redirect intent
  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;
    
    if (pendingRedirect) {
      localStorage.setItem('mock-intent-v1', pendingRedirect);
    } else {
      localStorage.removeItem('mock-intent-v1');
    }
    console.log('[Auth] Persisted pendingRedirect:', pendingRedirect);
  }, [pendingRedirect, isHydrated]);

  const logout = useCallback(() => {
    console.log('[Auth] Logout triggered');
    setIsAuthenticated(false);
    setPendingRedirect(null);
    localStorage.removeItem('mock-auth-v1');
    localStorage.removeItem('mock-intent-v1');
  }, []);

  const completeLogin = useCallback(
    (redirectOverride) => {
      console.log('[Auth] Login completed', { redirectOverride, pendingRedirect });
      setIsAuthenticated(true);
      const target = redirectOverride || pendingRedirect || '/';  // CHANGED: Default to home page
      setPendingRedirect(null);
      return target;
    },
    [pendingRedirect]
  );

  const setAuthIntent = useCallback((path) => {
    console.log('[Auth] Setting intent for:', path);
    setPendingRedirect(path);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      completeLogin,
      logout,
      pendingRedirect,
      setPendingRedirect: setAuthIntent,
      isHydrated,
    }),
    [isAuthenticated, completeLogin, logout, pendingRedirect, setAuthIntent, isHydrated]
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

// Legacy alias for compatibility
export const useMockAuth = useAuth;

export function useRequireAuthAction(actionLabel = 'this action') {
  const { isAuthenticated, setAuthIntent } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (onAuthenticated) => {
      if (isAuthenticated) {
        console.log('[Auth] User authenticated, executing action:', actionLabel);
        onAuthenticated?.();
        return;
      }

      const redirectPath = `${location.pathname}${location.search}`;
      console.log('[Auth] User not authenticated, showing auth modal with redirect:', redirectPath);
      setAuthIntent(redirectPath);

      toast.info('Please login or signup to continue', {
        description: `You need an account to ${actionLabel}.`,
        action: {
          label: 'Login',
          onClick: () => {
            console.log('[Auth] Navigating to login with redirect:', redirectPath);
            navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`);
          },
        },
        cancel: {
          label: 'Signup',
          onClick: () => {
            console.log('[Auth] Navigating to signup with redirect:', redirectPath);
            navigate(`/signup?redirect=${encodeURIComponent(redirectPath)}`);
          },
        },
      });
    },
    [actionLabel, isAuthenticated, location.pathname, location.search, navigate, setAuthIntent]
  );
}
