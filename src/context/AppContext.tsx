"use client"
import axios from "../utils/axiosConfig"

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

interface Authoritie {
    _id: number;
    name: string;
    puesto: string;
}

interface Post {
    _id: number;
    titulo: string;
    categoria: string;
    fecha: string;
    descripcion: string;
}

interface Member {
    _id: number;
    name_surname: string;
    puesto: string;
    linkedIn: string;
    profile_pic: string;
}

interface Event {
    _id: number;
    fecha: string;
    horario: string;
    event_name: string;
    descripcion: string;
}

interface Game {
    _id: number,
    titulo: string,
    autor: string,
    sinopsis: string,
    aportes: string,
    objetivo: string,
    desarrollo: string,
    condiciones: string,
    controles: string,
    caracteristicas: string,
    tecnologias: string,
    estilo: string,
    genero: string,
    game_images: string,
}


interface AppContextValue {
    username: Username | null;
    token: string | null;
    login: (data: any) => Promise<void>;
    logout: () => void;
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    members: Member[];
    setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
    authorities: Authoritie[];
    setAuthorities: React.Dispatch<React.SetStateAction<Authoritie[]>>;
    games: Game[];
    setGames: React.Dispatch<React.SetStateAction<Game[]>>;
    deleteItem: (type: string, id: number) => Promise<void>;
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
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<Username | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [authorities, setAuthorities] = useState<Authoritie[]>([]);
    const [games, setGames] = useState<Game[]>([]);


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
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/games');
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games', error);
            }
        };

        fetchGames();
    }, []);

    useEffect(() => {
        const fetchAuthorities = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/authorities');
                setAuthorities(response.data);
            } catch (error) {
                console.error('Error fetching authorities', error);
            }
        };

        fetchAuthorities();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/members');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members', error);
            }
        };

        fetchMembers();
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

        setToken(null);
        setUsername(null);
    };

    const deleteItem = async (type: string, id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/${type}/${id}`);
            
            switch(type) {
                case 'games':
                    setGames(prevItems => prevItems.filter(item => item._id !== id));
                    break;
                case 'members':
                    setMembers(prevItems => prevItems.filter(item => item._id !== id));
                    break;
                case 'posts':
                    setPosts(prevItems => prevItems.filter(item => item._id !== id));
                    break;
                case 'authorities':
                    setAuthorities(prevItems => prevItems.filter(item => item._id !== id));
                    break;
                case 'events':
                    setEvents(prevItems => prevItems.filter(item => item._id !== id));
                    break;
                default:
                    console.error('Unknown type:', type);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
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
                deleteItem
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
