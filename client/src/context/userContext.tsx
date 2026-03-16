import { useContext, createContext, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';


interface User {
    name: string,
    email: string
}

interface authContextType {
    user: User | null
    token: string | null,
    login: (token: string, user: User) => (void);
    logout: () => (void)
}

const AuthContext = createContext<authContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem(`loggedUser`);
        return storedUser ? JSON.parse(storedUser) : null
    });
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('loginToken')
    });
    useEffect(() => {
        const storedUser = localStorage.getItem('loggedUser');
        const storedToken = localStorage.getItem('loginToken');
        try {
            if (storedUser && storedToken) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser))
            }
        } catch (error) {
            console.error(`Invalid user data in localstorage`);
            localStorage.removeItem(`loggedUser`);
        }
    },[])

    const login = (token: string, user: User) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('loginToken', token);
        localStorage.setItem('loggedUser', JSON.stringify(user));
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('loginToken')
        localStorage.removeItem('loggedUser');
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within auth provider.")
    }
    return context;
}