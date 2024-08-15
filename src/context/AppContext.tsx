"use client";

import axios from "../utils/axiosConfig"
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface Username {
    id: number;
    username: string;
    password: string;
}

interface AppContextValue {
    username: Username | null;
    token: string | null;
    role: string | null;
    login: (data: any) => Promise<void>;
    logout: () => void;
}

interface AppContextProviderProps {
    children: ReactNode;
}

export const AppContext = createContext<AppContextValue | null>(null);

export function useAppContext() {
    const appContext = useContext(AppContext);

    if (appContext === null) {
        throw new Error("useAppContext was used outside of its Provider");
    }

    return appContext;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<Username | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [inactivityTimeout, setInactivityTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const cookies = parseCookies();
        const storedToken = cookies.token;
        const storedUser = cookies.user;
        const storedRole = cookies.role;

        if (storedToken && storedUser && storedRole) {
            setToken(storedToken);
            try {
                setUsername(JSON.parse(storedUser));
                setRole(JSON.parse(storedRole));
            } catch (error) {
                console.error("Failed to parse stored user:", error);
            }
        }

        const resetInactivityTimeout = () => {
            if (inactivityTimeout) {
                clearTimeout(inactivityTimeout);
            }
            const timeout = setTimeout(() => {
                logout();
            }, 10 * 60 * 1000);

            setInactivityTimeout(timeout);
        };

        window.addEventListener('mousemove', resetInactivityTimeout);
        window.addEventListener('keydown', resetInactivityTimeout);
        window.addEventListener('click', resetInactivityTimeout);

        return () => {
            if (inactivityTimeout) clearTimeout(inactivityTimeout);
            window.removeEventListener('mousemove', resetInactivityTimeout);
            window.removeEventListener('keydown', resetInactivityTimeout);
            window.removeEventListener('click', resetInactivityTimeout);
        };
    }, [inactivityTimeout]);

    const login = async (data: any) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URI}/users/login`, data);
            console.log(response);
            const { token, username, role } = response.data;

            setCookie(null, "token", token, { path: '/' });
            setCookie(null, "user", JSON.stringify(username), { path: '/' });
            setCookie(null, "role", JSON.stringify(role), { path: '/' });

            setToken(token);
            setUsername(username);
            setRole(role);

            if (inactivityTimeout) clearTimeout(inactivityTimeout);
            const timeout = setTimeout(() => {
                logout();
            }, 10 * 60 * 1000);

            setInactivityTimeout(timeout);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        destroyCookie(null, "token");
        destroyCookie(null, "user");
        destroyCookie(null, "role");

        router.push("/login");

        setToken(null);
        setUsername(null);
        setRole(null);

        if (inactivityTimeout) clearTimeout(inactivityTimeout);
    };

    return (
        <AppContext.Provider
            value={{
                username,
                token,
                role,
                login,
                logout,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}