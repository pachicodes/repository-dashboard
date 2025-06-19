import React from 'react';

interface RepositoryCardProps {
    name: string;
    description: string;
    status: 'online' | 'offline' | 'error';
    openIssues: number;
    pullRequests: number;
    releases: number;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ name, description, status, openIssues, pullRequests, releases }) => {
    return (
        <div className="repository-card">
            <h3>{name}</h3>
            <p>{description}</p>
            <div>
                <span>Issues: {openIssues}</span>
                <span>Pull Requests: {pullRequests}</span>
                <span>Releases: {releases}</span>
            </div>
            <StatusIndicator status={status} />
        </div>
    );
};

export default RepositoryCard;