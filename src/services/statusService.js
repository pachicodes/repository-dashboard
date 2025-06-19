import { Repository, Status } from '../types';

export const getFormattedStatus = (status: Status): string => {
    switch (status) {
        case 'online':
            return 'Online';
        case 'offline':
            return 'Offline';
        case 'error':
            return 'Error';
        default:
            return 'Unknown Status';
    }
};

export const filterRepositories = (repositories: Repository[], status: Status): Repository[] => {
    return repositories.filter(repo => repo.status === status);
};