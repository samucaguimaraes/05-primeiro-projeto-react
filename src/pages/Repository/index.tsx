import React, { useEffect, useState }  from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface RepositoryInfo{
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface Issue{
  id: number;
  title: string;
  html_url: string;
  user:{
    login: string;
  }
}

const Repository: React.FC = () => {
  const [repositoryInfo, setRepositoryInfo] = useState<RepositoryInfo | null >(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  /** Pegando o parametro passado pela rota */
  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      setRepositoryInfo(response.data);
    })

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    })
  }, [params.repository])

  return(
    <>
    <Header>
        <img src={logoImg} alt="Github Explorer"/>
        <Link to="/dashboard">
        <FiChevronLeft size={16} />
          Voltar
        </Link>
    </Header>
    {repositoryInfo && (
      <RepositoryInfo>
      <header>
        <img
        src={repositoryInfo.owner.avatar_url}
        alt={repositoryInfo.owner.login}/>
        <div>
          <strong>{repositoryInfo.full_name}</strong>
          <p>{repositoryInfo.description}</p>
        </div>
      </header>
      <ul>
        <li>
          <strong>{repositoryInfo.stargazers_count}</strong>
          <span>Start</span>
        </li>
        <li>
          <strong>{repositoryInfo.forks_count}</strong>
          <span>Forks</span>
        </li>
        <li>
          <strong>{repositoryInfo.open_issues_count}</strong>
          <span>Issues Abertas</span>
        </li>
      </ul>
    </RepositoryInfo>
    )}

    <Issues>
      {issues.map(issue => (
        <a key={issue.id} href={issue.html_url}>
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </div>

        <FiChevronRight size={20} />
        </a>
      ))}
    </Issues>
    </>
  );
};

export default Repository;
