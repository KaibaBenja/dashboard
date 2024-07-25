"use client"

import axios from "../utils/axiosConfig"
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useRouter } from 'next/navigation';

import { GameType } from "@/types/GameTypes";
import { PostType } from "@/types/NewsTypes";
import { EventType } from "@/types/EventTypes";
import { MemberType } from "@/types/MemberTypes";
import { AuthoritieType } from "@/types/AuthTypes";

import { fetchEvents } from "@/queries/Events";
import { fetchGames } from "@/queries/Games";
import { fetchAuthorities } from "@/queries/Authority";
import { fetchPosts } from "@/queries/Post";
import { fetchMembers } from "@/queries/Member";

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
    events: EventType[];
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
    posts: PostType[];
    setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
    members: MemberType[];
    setMembers: React.Dispatch<React.SetStateAction<MemberType[]>>;
    authorities: AuthoritieType[];
    setAuthorities: React.Dispatch<React.SetStateAction<AuthoritieType[]>>;
    games: GameType[];
    setGames: React.Dispatch<React.SetStateAction<GameType[]>>;
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
    const [events, setEvents] = useState<EventType[]>([]);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [members, setMembers] = useState<MemberType[]>([]);
    const [authorities, setAuthorities] = useState<AuthoritieType[]>([]);
    const [games, setGames] = useState<GameType[]>([]);

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
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsData, gamesData, authoritiesData, postsData, membersData] = await Promise.all([
                    fetchEvents(),
                    fetchGames(),
                    fetchAuthorities(),
                    fetchPosts(),
                    fetchMembers(),
                ]);

                setEvents(eventsData);
                setGames(gamesData);
                setAuthorities(authoritiesData);
                setPosts(postsData);
                setMembers(membersData);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const login = async (data: any) => {
        try {
            const response = await axios.post("https://gamecenter-backend.vercel.app/api/users/login", data);
            console.log(response);
            const { token, username, role } = response.data;

            setCookie(null, "token", token, { path: '/' });
            setCookie(null, "user", JSON.stringify(username), { path: '/' });
            setCookie(null, "role", JSON.stringify(role), { path: '/' });

            setToken(token);
            setUsername(username);
            setRole(role);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        destroyCookie(null, "token");
        destroyCookie(null, "user");
        destroyCookie(null, "role");

        router.push("/login")

        setToken(null);
        setUsername(null);
        setRole(null);
    };

    return (
        <AppContext.Provider
            value={{
                username,
                token,
                role,
                login,
                logout,
                events,
                setEvents,
                posts,
                setPosts,
                members,
                setMembers,
                authorities,
                setAuthorities,
                games,
                setGames,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
