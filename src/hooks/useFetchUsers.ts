"use client";

import { useState, useEffect } from "react";
import { EventType } from "@/types/EventTypes";
import { fetchUsers } from "@/queries/Users";

export function useFetchEvents() {
    const [users, setUsers] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsData = await fetchUsers();
                setUsers(eventsData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { users, loading, error, setUsers };
}
