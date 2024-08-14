"use client";

import { useState, useEffect } from "react";
import { GameType } from "@/types/GameTypes";
import { fetchGames } from "@/queries/Games";

export function useFetchGames() {
    const [games, setGames] = useState<GameType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gamesData = await fetchGames();
                setGames(gamesData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { games, loading, error, setGames };
}
