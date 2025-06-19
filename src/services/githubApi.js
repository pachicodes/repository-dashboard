import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

/**
 * Busca um repositório do GitHub baseado no formato "owner/repo"
 * @param {string} repoFullName - Nome do repositório no formato "owner/repo"
 * @returns {Promise<Object>} - Dados do repositório
 */
export const searchRepository = async (repoFullName) => {
    try {
        // Separa o nome do owner e do repositório
        const [owner, repo] = repoFullName.split('/');
        
        if (!owner || !repo) {
            throw new Error('O formato deve ser "owner/repo"');
        }
        
        // Busca os dados do repositório
        const repoResponse = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}`);
        
        // Busca os PRs abertos
        const prsResponse = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}/pulls?state=open`);
        
        // Busca as releases mais recentes (limitado a 3)
        const releasesResponse = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}/releases?per_page=3`);
        
        // Busca os commits mais recentes (limitado a 5)
        const commitsResponse = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}/commits?per_page=5`);
        
        // Retorna os dados formatados
        return {
            id: repoResponse.data.id,
            name: repoResponse.data.name,
            fullName: repoResponse.data.full_name,
            description: repoResponse.data.description || 'Sem descrição',
            link: repoResponse.data.html_url,
            issues: repoResponse.data.open_issues_count,
            stars: repoResponse.data.stargazers_count,
            forks: repoResponse.data.forks_count,
            watchers: repoResponse.data.watchers_count,
            pullRequests: prsResponse.data.length,
            language: repoResponse.data.language,
            lastUpdated: repoResponse.data.updated_at,
            releases: releasesResponse.data.map(release => ({
                name: release.name || release.tag_name,
                date: release.published_at,
                url: release.html_url
            })),
            recentCommits: commitsResponse.data.map(commit => ({
                message: commit.commit.message,
                author: commit.commit.author.name,
                date: commit.commit.author.date,
                url: commit.html_url
            }))
        };
    } catch (error) {
        console.error('Erro ao buscar repositório:', error);
        throw error;
    }
};