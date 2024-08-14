"use client";

import { useState, useEffect } from "react";
import { AuthoritieType } from "@/types/AuthTypes";
import { fetchAuthorities } from "@/queries/Authority";

export function useFetchAuthorities() {
    const [authorities, setAuthorities] = useState<AuthoritieType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authoritiesData = await fetchAuthorities();
                setAuthorities(authoritiesData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { authorities, loading, error, setAuthorities };
}
