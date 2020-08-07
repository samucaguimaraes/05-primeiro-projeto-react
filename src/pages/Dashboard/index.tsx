import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import {Title, Form, Repositories, Error} from './styles';
import Repository from '../Repository';

/** Não precisa a tipagem de tudo que vai ter, apenas as utilizaveis */
interface Repository{
  id: number;
  name: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}


const Dashboard: React.FC = () => {
  /** Dados do input de pesquisa*/
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  /** Armazenando os reposiórios */
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    /** Verifico se tem algum repositorio no storage, caso não retorna o [] */
    const storagedRepositories = localStorage.getItem(
      '@githubExplorer:repositories',
    );

    if(storagedRepositories){
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  /** Atualiza uma variável no localstorage toda vez que houver mudanças */
  useEffect(() => {
    localStorage.setItem(
      '@githubExplorer:repositories',
      JSON.stringify(repositories))
  }, [repositories]);


  async function handleAddRepository(
   event: FormEvent<HTMLFormElement>
    ): Promise<void>{
      event.preventDefault();

      if(!newRepo){
        setInputError('Digite o autor/nome do repositorio');
        return;
      }

      try{
        const response = await api.get<Repository>(`repos/${newRepo}`);
        const repository = response.data;
        setRepositories([...repositories, repository]);
        setNewRepo('');
        setInputError('');

      } catch{
        setInputError('Erro na busca por esse repositorio');
      }

    }

  return (
  <>
    <img src={logoImg} alt="Github Explorer"/>
    <Title> Explore Repository no Github </Title>

    <Form hasError={!!inputError} onSubmit={handleAddRepository}>
      <input
        value={newRepo}
        onChange={ e => setNewRepo(e.target.value)}
        placeholder="Digite o nome do repositório"
      />
      <button type="submit">Pesquisar</button>
    </Form>

  { inputError && <Error>{inputError}</Error>}

    <Repositories>
      {repositories.map(repository => (
      <Link
        key={repository.id}
        to={`/repositories/${repository.full_name}`}
      >
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
        />
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>
        <FiChevronRight size={20} />
      </Link>
      ))}
    </Repositories>
  </>
  )
}

export default Dashboard;
