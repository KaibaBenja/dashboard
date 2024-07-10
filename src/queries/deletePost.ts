import axios from '@/utils/axiosConfig';

export async function deletePost(postId: number) {
    try {
        await axios.delete(`http://localhost:3000/api/posts/${postId}`);
        console.log(`Post with ID ${postId} deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete post with ID ${postId}:`, error);
        throw error;
    }
}

export const fetchPosts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts', error);
        throw error;
    }
};

export const UpdatePosts = async () => {
    try {
        const response = await axios.put('http://localhost:3000/api/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts', error);
        throw error;
    }
};

export const AddPosts = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts', error);
        throw error;
    }
};