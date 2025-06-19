import React, { useState } from 'react';
import RepositoryCard from './RepositoryCard';
import { getRepoData } from '../services/githubApi';

const Dashboard = () => {
    const [repos, setRepos] = useState([]);
    const [repoInput, setRepoInput] = useState('');
    const [error, setError] = useState(null);

    const handleAddRepo = async () => {
        try {
            const [owner, repo] = repoInput.split('/');
            if (!owner || !repo) {
                throw new Error('Formato inválido. Use owner/repo.');
            }
            const repoData = await getRepoData(owner, repo);
            setRepos([...repos, repoData]);
            setRepoInput('');
            setError(null);
        } catch (err) {
            setError('Repositório não encontrado ou erro na API.');
            console.error(err);
        }
    };

    const handleRefresh = async (repoId) => {
        try {
            const repoToRefresh = repos.find(r => r.id === repoId);
            const [owner, repo] = repoToRefresh.link.split('/').slice(-2);
            const updatedData = await getRepoData(owner, repo);
            setRepos(repos.map(r => r.id === repoId ? updatedData : r));
        } catch (err) {
            setError('Erro ao atualizar o repositório.');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Dashboard de Repositórios</h1>
            <div>
                <input 
                    type="text" 
                    value={repoInput} 
                    onChange={(e) => setRepoInput(e.target.value)}
                    placeholder="owner/repo" 
                />
                <button onClick={handleAddRepo}>Adicionar</button>
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div>
                {repos.map((repo) => (
                    <RepositoryCard key={repo.id} repo={repo} onRefresh={handleRefresh} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;