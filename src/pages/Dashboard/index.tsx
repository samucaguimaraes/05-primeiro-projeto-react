import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
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
  const [repositories, setRepositories] = useState<Repository[]>([]);

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
      <a key={repository.id}  href="teste">
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
        />
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>
        <FiChevronRight size={20} />
      </a>
      ))}
    </Repositories>
  </>
  )
}

export default Dashboard;
