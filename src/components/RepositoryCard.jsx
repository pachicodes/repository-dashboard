import React from 'react';

interface RepositoryCardProps {
    repo: {
        id: number;
        name: string;
        description: string;
        link: string;
        issues: number;
        prs: number;
        stars: number;
    };
    onRefresh: (id: number) => void;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo, onRefresh }) => {
    return (
        <div className="repository-card">
            <h3><a href={repo.link} target="_blank" rel="noopener noreferrer">{repo.name}</a></h3>
            <p>{repo.description}</p>
            <div>
                <span>Issues: {repo.issues}</span>
                <span>Pull Requests: {repo.prs}</span>
                <span>Stars: {repo.stars}</span>
            </div>
            <button onClick={() => onRefresh(repo.id)}>Atualizar</button>
        </div>
    );
};

export default RepositoryCard;