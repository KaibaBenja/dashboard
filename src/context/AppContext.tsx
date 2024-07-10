"use client"
import axios from "../utils/axiosConfig"

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
import { fetchPosts } from "@/queries/deletePost";
import { fetchMembers } from "@/queries/deleteMember";

interface Username {
    id: number;
    username: string;
    password: string;
}


interface AppContextValue {
    username: Username | null;
    token: string | null;
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
    const [events, setEvents] = useState<EventType[]>([]);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [members, setMembers] = useState<MemberType[]>([]);
    const [authorities, setAuthorities] = useState<AuthoritieType[]>([]);
    const [games, setGames] = useState<GameType[]>([]);


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUsername(JSON.parse(storedUser));
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
            const response = await axios.post("http://localhost:3000/api/users/login", data);
            console.log(response);
            const { token, username } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(username));

            setToken(token);
            setUsername(username);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login")

        setToken(null);
        setUsername(null);

    };


    return (
        <AppContext.Provider
            value={{
                username,
                token,
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
