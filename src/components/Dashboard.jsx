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
  PageHeader,
  Label,
  Link,
  Text,
  CounterLabel,
  ButtonGroup,
  Avatar,
  Timeline
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
  GitCommitIcon,
  PersonIcon
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
        <Box bg="canvas.default" minHeight="100vh">
            <Header>
                <Header.Item>
                    <Header.Link href="#" fontSize={2}>
                        <MarkGithubIcon size={32} />
                        <span style={{ marginLeft: 8 }}>Repository Dashboard</span>
                    </Header.Link>
                </Header.Item>
            </Header>
            
            <PageLayout>
                <PageLayout.Content>
                    <Box p={4} maxWidth={1012} mx="auto">
                        <PageHeader>
                            <Heading as="h1" fontSize={4} mb={2}>GitHub Repository Status</Heading>
                            
                            <Box mb={4} mt={3}>
                                <form onSubmit={handleSearch}>
                                    <Box display="flex" flexDirection={['column', 'column', 'row']} width="100%">
                                        <FormControl sx={{ flexGrow: 1, mr: [0, 0, 2], mb: [2, 2, 0] }}>
                                            <FormControl.Label visuallyHidden>Repositório</FormControl.Label>
                                            <TextInput
                                                block
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                placeholder="Digite owner/repo (ex: facebook/react)"
                                                aria-label="Digite owner/repo"
                                                icon={RepoIcon}
                                            />
                                        </FormControl>
                                        <Button type="submit" variant="primary">Buscar</Button>
                                    </Box>
                                </form>
                                
                                {error && (
                                    <Flash variant="danger" mt={3}>
                                        {error}
                                    </Flash>
                                )}
                            </Box>
                        </Pagehead>

                        {loading && (
                            <Box display="flex" justifyContent="center" p={4}>
                                <Spinner size="large" />
                            </Box>
                        )}
                        
                        {repository && !loading && (
                            <Box borderWidth="1px" borderStyle="solid" borderColor="border.default" borderRadius={2} overflow="hidden" bg="canvas.subtle">
                                <Box p={3} bg="canvas.default" borderBottomWidth="1px" borderBottomStyle="solid" borderBottomColor="border.default" display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Heading as="h2" fontSize={3}>
                                            <RepoIcon size={16} mr={2} />
                                            <Link href={repository.link} target="_blank" rel="noopener noreferrer">
                                                {repository.fullName}
                                            </Link>
                                        </Heading>
                                        <Text as="p" fontSize={1} color="fg.muted" mt={1}>
                                            {repository.description}
                                        </Text>
                                    </Box>
                                    <Button onClick={handleRefresh} variant="outline" leadingIcon={SyncIcon}>
                                        Atualizar
                                    </Button>
                                </Box>
                                
                                <Box p={3}>
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(5, 1fr)'],
                                        gap: 3,
                                        mb: 4
                                    }}>
                                        <Box display="flex" flexDirection="column" alignItems="center" p={2} bg="canvas.default" borderRadius={2} borderColor="border.default" borderWidth="1px" borderStyle="solid">
                                            <Text as="span" fontSize={1} color="fg.muted" mb={1} display="flex" alignItems="center">
                                                <IssueOpenedIcon size={14} mr={1} />
                                                Issues
                                            </Text>
                                            <CounterLabel>{repository.issues}</CounterLabel>
                                        </Box>
                                        
                                        <Box display="flex" flexDirection="column" alignItems="center" p={2} bg="canvas.default" borderRadius={2} borderColor="border.default" borderWidth="1px" borderStyle="solid">
                                            <Text as="span" fontSize={1} color="fg.muted" mb={1} display="flex" alignItems="center">
                                                <GitPullRequestIcon size={14} mr={1} />
                                                Pull Requests
                                            </Text>
                                            <CounterLabel>{repository.pullRequests}</CounterLabel>
                                        </Box>
                                        
                                        <Box display="flex" flexDirection="column" alignItems="center" p={2} bg="canvas.default" borderRadius={2} borderColor="border.default" borderWidth="1px" borderStyle="solid">
                                            <Text as="span" fontSize={1} color="fg.muted" mb={1} display="flex" alignItems="center">
                                                <StarIcon size={14} mr={1} />
                                                Estrelas
                                            </Text>
                                            <CounterLabel>{repository.stars}</CounterLabel>
                                        </Box>
                                        
                                        <Box display="flex" flexDirection="column" alignItems="center" p={2} bg="canvas.default" borderRadius={2} borderColor="border.default" borderWidth="1px" borderStyle="solid">
                                            <Text as="span" fontSize={1} color="fg.muted" mb={1} display="flex" alignItems="center">
                                                <RepoForkedIcon size={14} mr={1} />
                                                Forks
                                            </Text>
                                            <CounterLabel>{repository.forks}</CounterLabel>
                                        </Box>
                                        
                                        <Box display="flex" flexDirection="column" alignItems="center" p={2} bg="canvas.default" borderRadius={2} borderColor="border.default" borderWidth="1px" borderStyle="solid">
                                            <Text as="span" fontSize={1} color="fg.muted" mb={1} display="flex" alignItems="center">
                                                <CodeIcon size={14} mr={1} />
                                                Linguagem
                                            </Text>
                                            <Label variant="accent">{repository.language || 'N/A'}</Label>
                                        </Box>
                                    </Box>
                                    
                                    <UnderlineNav aria-label="Repository details">
                                        <UnderlineNav.Item selected icon={TagIcon}>
                                            Releases
                                        </UnderlineNav.Item>
                                        <UnderlineNav.Item icon={GitCommitIcon}>
                                            Commits
                                        </UnderlineNav.Item>
                                    </UnderlineNav>
                                    
                                    {repository.releases && repository.releases.length > 0 && (
                                        <Box mt={3}>
                                            <Timeline>
                                                {repository.releases.map((release, index) => (
                                                    <Timeline.Item key={index}>
                                                        <Timeline.Badge>
                                                            <TagIcon />
                                                        </Timeline.Badge>
                                                        <Timeline.Body>
                                                            <Link href={release.url} target="_blank" rel="noopener noreferrer">
                                                                {release.name}
                                                            </Link>
                                                            <Text as="span" fontSize={1} color="fg.muted" ml={2}>
                                                                {new Date(release.date).toLocaleDateString()}
                                                            </Text>
                                                        </Timeline.Body>
                                                    </Timeline.Item>
                                                ))}
                                            </Timeline>
                                        </Box>
                                    )}
                                    
                                    {repository.recentCommits && repository.recentCommits.length > 0 && (
                                        <Box mt={3}>
                                            <Timeline>
                                                {repository.recentCommits.map((commit, index) => (
                                                    <Timeline.Item key={index}>
                                                        <Timeline.Badge>
                                                            <GitCommitIcon />
                                                        </Timeline.Badge>
                                                        <Timeline.Body>
                                                            <Link href={commit.url} target="_blank" rel="noopener noreferrer">
                                                                {commit.message.split('\n')[0]}
                                                            </Link>
                                                            <Box display="flex" alignItems="center" mt={1}>
                                                                <Text as="span" fontSize={1} color="fg.muted" display="flex" alignItems="center">
                                                                    <PersonIcon size={12} mr={1} />
                                                                    {commit.author}
                                                                </Text>
                                                                <Text as="span" fontSize={1} color="fg.muted" ml={3}>
                                                                    {new Date(commit.date).toLocaleDateString()}
                                                                </Text>
                                                            </Box>
                                                        </Timeline.Body>
                                                    </Timeline.Item>
                                                ))}
                                            </Timeline>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </PageLayout.Content>
            </PageLayout>
        </Box>
    );
};

export default Dashboard;