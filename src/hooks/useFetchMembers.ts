"use client";

import { useState, useEffect } from "react";
import { MemberType } from "@/types/MemberTypes";
import { fetchMembers } from "@/queries/Member";

export function useFetchMembers() {
    const [members, setMembers] = useState<MemberType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const membersData = await fetchMembers();
                setMembers(membersData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { members, loading, error, setMembers };
}
