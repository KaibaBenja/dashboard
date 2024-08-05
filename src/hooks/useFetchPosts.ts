"use client";

import { useState, useEffect } from "react";
import { PostType } from "@/types/PostTypes";
import { fetchPosts } from "@/queries/Post";

export function useFetchPosts() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsData = await fetchPosts();
                setPosts(postsData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { posts, loading, error, setPosts };
}
