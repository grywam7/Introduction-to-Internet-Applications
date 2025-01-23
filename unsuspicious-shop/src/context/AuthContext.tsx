import React, { createContext, useContext, useState, useEffect } from 'react';
import { users as defaultUsers, User } from '../data/Users'; // Import domyślnych użytkowników

interface AuthContextProps {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        // Sprawdzenie poprawności danych w localStorage
        if (Array.isArray(parsedUsers) && parsedUsers.every((user) => user.username && user.password)) {
          setUsers(parsedUsers);
        } else {
          throw new Error('Pusta lub niepoprawna lista użytkowników w localStorage');
        }
      } catch (error) {
        console.error('Błąd w danych użytkowników w localStorage:', error);
        // Usunięcie błędnych danych i przywrócenie domyślnych użytkowników
        localStorage.removeItem('users');
        setUsers(defaultUsers);
        localStorage.setItem('users', JSON.stringify(defaultUsers));
      }
    } else {
      // Jeśli brak danych w localStorage, zapisz domyślnych użytkowników
      setUsers(defaultUsers);
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }, []);
  
  const login = (username: string, password: string): boolean => {
    const foundUser = users.find((u) => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (username: string, password: string): boolean => {
    // Sprawdź, czy użytkownik o podanej nazwie już istnieje
    if (users.some((u) => u.username === username)) {
      return false; // Rejestracja nieudana
    }

    const newUser: User = {
      id: users.length + 1, // ID dla nowego użytkownika
      username,
      password,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    return true; // Rejestracja udana
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
