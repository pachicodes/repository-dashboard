import React from 'react';
import RepositoryCard from './RepositoryCard';
import StatusIndicator from './StatusIndicator';
import { Repository } from '../types';

interface DashboardProps {
  repositories: Repository[];
}

const Dashboard: React.FC<DashboardProps> = ({ repositories }) => {
  return (
    <div>
      <h1>Dashboard de Repositórios</h1>
      <div>
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>
      <StatusIndicator repositories={repositories} />
    </div>
  );
};

export default Dashboard;