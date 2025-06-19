import React, { useState } from 'react';
import { searchRepository } from '../services/githubApi';
import {
  Box,
  PageLayout,
  Header,
  Text,
  Heading,
  FormControl,
  TextInput,
  Button,
  Spinner,
  Flash,
  Link,
  Breadcrumbs,
  Avatar,
  CounterLabel,
  Timeline,
  BranchName,
  Label,
  CircleOcticon
} from '@primer/react';
import {
  MarkGithubIcon,
  RepoIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  StarFillIcon,
  RepoForkedIcon,
  CodeIcon,
  SyncIcon,
  TagIcon,
  CommitIcon,
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
    <PageLayout>
      <PageLayout.Header>
        <Header>
          <Header.Item>
            <Header.Link href="#" fontSize={2}>
              <CircleOcticon icon={MarkGithubIcon} size={32} sx={{ mr: 2 }} />
              <span>GitHub Repository Status</span>
            </Header.Link>
          </Header.Item>
        </Header>
        
        <Box sx={{ p: 4, bg: 'canvas.subtle' }}>
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Heading sx={{ fontSize: 4, mb: 3 }}>Buscar Repositório</Heading>
            
            <form onSubmit={handleSearch}>
              <FormControl>
                <FormControl.Label>Nome do repositório</FormControl.Label>
                <Box display="flex">
                  <TextInput
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="owner/repo (ex: facebook/react)"
                    aria-label="Nome do repositório"
                    sx={{ flex: 1, mr: 2 }}
                  />
                  <Button type="submit" variant="primary">
                    Buscar
                  </Button>
                </Box>
                <FormControl.Caption>Digite no formato owner/repo</FormControl.Caption>
              </FormControl>
            </form>
            
            {error && (
              <Flash variant="danger" sx={{ mt: 3 }}>
                {error}
              </Flash>
            )}
          </Box>
        </Box>
      </PageLayout.Header>

      <PageLayout.Content>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
          {loading && (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Spinner size="large" />
              <Text as="p" sx={{ mt: 3 }}>Carregando informações...</Text>
            </Box>
          )}
          
          {repository && !loading && (
            <Box>
              {/* Cabeçalho do repositório */}
              <Box sx={{ mb: 4 }}>
                <Breadcrumbs>
                  <Breadcrumbs.Item>
                    <RepoIcon />
                    <Link href={repository.link} target="_blank" sx={{ ml: 2 }}>
                      {repository.fullName}
                    </Link>
                  </Breadcrumbs.Item>
                </Breadcrumbs>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mt: 3 }}>
                  <Box>
                    <Heading sx={{ fontSize: 4, mb: 2 }}>{repository.name}</Heading>
                    <Text as="p" sx={{ color: 'fg.muted', fontSize: 1 }}>
                      {repository.description}
                    </Text>
                  </Box>
                  <Button onClick={handleRefresh} leadingIcon={SyncIcon}>
                    Atualizar
                  </Button>
                </Box>
              </Box>
              
              {/* Estatísticas */}
              <Box sx={{ mb: 4, p: 3, borderWidth: '1px', borderStyle: 'solid', borderColor: 'border.default', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircleOcticon icon={IssueOpenedIcon} size={20} sx={{ mr: 2, color: 'success.fg' }} />
                    <Box>
                      <Text sx={{ fontWeight: 'bold', display: 'block' }}>{repository.issues}</Text>
                      <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Issues</Text>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircleOcticon icon={GitPullRequestIcon} size={20} sx={{ mr: 2, color: 'done.fg' }} />
                    <Box>
                      <Text sx={{ fontWeight: 'bold', display: 'block' }}>{repository.pullRequests}</Text>
                      <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Pull Requests</Text>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircleOcticon icon={StarFillIcon} size={20} sx={{ mr: 2, color: 'attention.fg' }} />
                    <Box>
                      <Text sx={{ fontWeight: 'bold', display: 'block' }}>{repository.stars}</Text>
                      <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Stars</Text>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircleOcticon icon={RepoForkedIcon} size={20} sx={{ mr: 2, color: 'accent.fg' }} />
                    <Box>
                      <Text sx={{ fontWeight: 'bold', display: 'block' }}>{repository.forks}</Text>
                      <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Forks</Text>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircleOcticon icon={CodeIcon} size={20} sx={{ mr: 2, color: 'fg.muted' }} />
                    <Box>
                      <Text sx={{ fontWeight: 'bold', display: 'block' }}>{repository.language || 'N/A'}</Text>
                      <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Linguagem</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              {/* Últimas releases */}
              {repository.releases && repository.releases.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CircleOcticon icon={TagIcon} sx={{ mr: 2 }} />
                    <Heading sx={{ fontSize: 2 }}>Últimas Releases</Heading>
                  </Box>
                  
                  <Box sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'border.default', borderRadius: 2 }}>
                    {repository.releases.map((release, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          p: 3, 
                          borderTop: index > 0 ? '1px solid' : 'none',
                          borderColor: 'border.default'
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Link href={release.url} target="_blank">
                            <Text sx={{ fontWeight: 'bold' }}>{release.name}</Text>
                          </Link>
                          <Label variant="small">
                            {new Date(release.date).toLocaleDateString()}
                          </Label>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              
              {/* Commits recentes */}
              {repository.recentCommits && repository.recentCommits.length > 0 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CircleOcticon icon={CommitIcon} sx={{ mr: 2 }} />
                    <Heading sx={{ fontSize: 2 }}>Commits Recentes</Heading>
                  </Box>
                  
                  <Timeline>
                    {repository.recentCommits.map((commit, index) => (
                      <Timeline.Item key={index}>
                        <Timeline.Badge>
                          <CommitIcon />
                        </Timeline.Badge>
                        <Timeline.Body>
                          <Link href={commit.url} target="_blank">
                            {commit.message.split('\n')[0]}
                          </Link>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, fontSize: 0, color: 'fg.muted' }}>
                            <PersonIcon size={12} />
                            <Text sx={{ ml: 1 }}>{commit.author}</Text>
                            <Text sx={{ ml: 3 }}>
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
          )}
        </Box>
      </PageLayout.Content>
      
      <PageLayout.Footer>
        <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'border.default', textAlign: 'center' }}>
          <Text sx={{ fontSize: 0, color: 'fg.muted' }}>
            GitHub Repository Status Dashboard &copy; {new Date().getFullYear()}
          </Text>
        </Box>
      </PageLayout.Footer>
    </PageLayout>
  );
};

export default Dashboard;