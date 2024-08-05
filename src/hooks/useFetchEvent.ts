"use client";

import { useState, useEffect } from "react";
import { EventType } from "@/types/EventTypes";
import { fetchEvents } from "@/queries/Events";

export function useFetchEvents() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsData = await fetchEvents();
                setEvents(eventsData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { events, loading, error, setEvents };
}
