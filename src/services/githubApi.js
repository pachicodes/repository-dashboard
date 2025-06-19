import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const fetchRepositories = async (username) => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
};

export const fetchRepositoryStatus = async (owner, repo) => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}/status`);
        return response.data;
    } catch (error) {
        console.error('Error fetching repository status:', error);
        throw error;
    }
};

export const getRepoData = async (owner, repo) => {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}`);
    const prs = await axios.get(response.data.pulls_url.replace('{/number}', ''));

    return {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        link: response.data.html_url,
        issues: response.data.open_issues_count,
        stars: response.data.stargazers_count,
        prs: prs.data.length,
    };
};