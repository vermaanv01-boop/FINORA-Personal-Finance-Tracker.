import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USERS_STORAGE_KEY = 'finora_registered_users';
const CURRENT_USER_KEY = 'finora_current_user';

// Pre-seeded demo user for quick sign-in
const DEFAULT_DEMO_USER = {
  id: 'usr_demo',
  name: 'Eleanor Laurence',
  email: 'demo@finora.io',
  password: 'Password123!',
  createdAt: new Date().toISOString()
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      if (saved) return JSON.parse(saved);
      // Automatically keep demo logged in by default for smooth experience,
      // or user can log out
      return DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  // Ensure demo user exists in registered list
  useEffect(() => {
    try {
      const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
      let users = rawUsers ? JSON.parse(rawUsers) : [];
      if (!users.some(u => u.email.toLowerCase() === DEFAULT_DEMO_USER.email.toLowerCase())) {
        users.push(DEFAULT_DEMO_USER);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }
    } catch (e) {
      console.warn('Could not initialize users store', e);
    }
  }, []);

  const login = (email, password, remember = true) => {
    try {
      const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
      const users = rawUsers ? JSON.parse(rawUsers) : [DEFAULT_DEMO_USER];
      const found = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (found) {
        const safeUser = { id: found.id, name: found.name, email: found.email };
        setCurrentUser(safeUser);
        if (remember) {
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
        } else {
          sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
          localStorage.removeItem(CURRENT_USER_KEY);
        }
        return { success: true, user: safeUser };
      }
      return { success: false, error: 'Invalid email or password combination.' };
    } catch (err) {
      return { success: false, error: 'Authentication failed. Please check localStorage.' };
    }
  };

  const signup = (name, email, password) => {
    try {
      const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
      let users = rawUsers ? JSON.parse(rawUsers) : [DEFAULT_DEMO_USER];

      if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      const newUser = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email };
      setCurrentUser(safeUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

      return { success: true, user: safeUser };
    } catch (err) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
      sessionStorage.removeItem(CURRENT_USER_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        demoUser: DEFAULT_DEMO_USER
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
