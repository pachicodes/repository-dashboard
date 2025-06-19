export interface Repository {
    id: number;
    name: string;
    description: string;
    url: string;
    open_issues_count: number;
    pull_requests_url: string;
    releases_url: string;
    status: Status;
}

export enum Status {
    ONLINE = 'online',
    OFFLINE = 'offline',
    ERROR = 'error',
}

export interface RepositoryStatus {
    repository: Repository;
    lastUpdated: Date;
}