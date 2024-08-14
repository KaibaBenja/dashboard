import axios from '@/utils/axiosConfig';

interface PostBodyData {
    titulo: string;
    categoria: string;
    fecha: string;
    descripcion: string;
}

export const AddPosts = async (data: PostBodyData) => {
    try {
        const response = await axios.post('https://gamecenter-backend.vercel.app/api/posts', data);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts', error);
        throw error;
    }
};

export const fetchPost = async (postId: string) => {
    try {
        const response = await axios.get(
            `https://gamecenter-backend.vercel.app/api/members/${postId}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching post ${postId}`, error);
        throw error;
    }
};

export const fetchPosts = async () => {
    try {
        const response = await axios.get('https://gamecenter-backend.vercel.app/api/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts', error);
        throw error;
    }
};

export const UpdatePosts = async (postId: string, data: PostBodyData) => {
    try {
        const response = await axios.put(`https://gamecenter-backend.vercel.app/api/posts/${postId}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching posts ${postId}`, error);
        throw error;
    }
};


export async function deletePost(postId: string) {
    try {
        await axios.delete(`https://gamecenter-backend.vercel.app/api/posts/${postId}`);
        console.log(`Post with ID ${postId} deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete post with ID ${postId}:`, error);
        throw error;
    }
}