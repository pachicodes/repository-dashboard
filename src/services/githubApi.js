import axios from 'axios';
import { Repository, Status } from '../types';

const GITHUB_API_URL = 'https://api.github.com';

export const fetchRepositories = async (username: string): Promise<Repository[]> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
};

export const fetchRepositoryStatus = async (owner: string, repo: string): Promise<Status> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}/status`);
        return response.data;
    } catch (error) {
        console.error('Error fetching repository status:', error);
        throw error;
    }
};