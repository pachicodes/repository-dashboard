import React, { useState } from 'react';
import { searchRepository } from '../services/githubApi';
import {
  Box,
  Header,
  Heading,
  TextInput,
  Button,
  FormControl,
  Flash,
  Spinner,
  PageLayout,
  Label,
  Link,
  Text,
  CounterLabel,
  ButtonGroup,
  Avatar,
  Timeline,
  UnderlineNav,
  Pagehead
} from '@primer/react';
import {
  RepoIcon,
  StarIcon,
  RepoForkedIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  SyncIcon,
  TagIcon,
  CodeIcon,
  MarkGithubIcon,
  CommitIcon,
  PeopleIcon
} from '@primer/octicons-react';

const Dashboard = () => {
    const [searchInput, setSearchInput] = useState('');
    const [repository, setRepository] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchInput.includes('/')) {
            setError('O formato deve ser "owner/repo". Exemplo: facebook/react');
            return;
        }
        
        try {
            setLoading(true);
            setError(null);
            const repoData = await searchRepository(searchInput);
            setRepository(repoData);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError('Repositório não encontrado ou erro na API.');
            console.error(err);
        }
    };

    const handleRefresh = async () => {
        if (!repository) return;
        
        try {
            setLoading(true);
            const updatedData = await searchRepository(repository.fullName);
            setRepository(updatedData);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError('Erro ao atualizar dados do repositório.');
            console.error(err);
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>GitHub Repository Status</h1>
                <form onSubmit={handleSearch} className="search-form">
                    <input 
                        type="text" 
                        value={searchInput} 
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Digite owner/repo (ex: facebook/react)" 
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Buscar</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </header>

            {loading && <div className="loading">Carregando...</div>}
            
            {repository && !loading && (
                <div className="repository-details">
                    <div className="repo-header">
                        <div>
                            <h2>
                                <a href={repository.link} target="_blank" rel="noopener noreferrer">
                                    {repository.fullName}
                                </a>
                            </h2>
                            <p className="description">{repository.description}</p>
                        </div>
                        <button onClick={handleRefresh} className="refresh-button">
                            Atualizar
                        </button>
                    </div>
                    
                    <div className="stats-container">
                        <div className="stat-item">
                            <span className="stat-label">Issues abertas</span>
                            <span className="stat-value">{repository.issues}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Pull Requests</span>
                            <span className="stat-value">{repository.pullRequests}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Estrelas</span>
                            <span className="stat-value">{repository.stars}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Forks</span>
                            <span className="stat-value">{repository.forks}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Linguagem</span>
                            <span className="stat-value">{repository.language || 'N/A'}</span>
                        </div>
                    </div>
                    
                    {repository.releases && repository.releases.length > 0 && (
                        <div className="section">
                            <h3>Últimas releases</h3>
                            <ul className="releases-list">
                                {repository.releases.map((release, index) => (
                                    <li key={index}>
                                        <a href={release.url} target="_blank" rel="noopener noreferrer">
                                            {release.name}
                                        </a>
                                        <span className="date">
                                            {new Date(release.date).toLocaleDateString()}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    {repository.recentCommits && repository.recentCommits.length > 0 && (
                        <div className="section">
                            <h3>Commits recentes</h3>
                            <ul className="commits-list">
                                {repository.recentCommits.map((commit, index) => (
                                    <li key={index}>
                                        <a href={commit.url} target="_blank" rel="noopener noreferrer">
                                            {commit.message.split('\n')[0]}
                                        </a>
                                        <div className="commit-info">
                                            <span>{commit.author}</span>
                                            <span className="date">
                                                {new Date(commit.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;