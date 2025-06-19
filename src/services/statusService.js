export const getFormattedStatus = (status) => {
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

export const filterRepositories = (repositories, status) => {
    return repositories.filter(repo => repo.status === status);
};