import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import {Title, Form, Repositories} from './styles';


const Dashboard: React.FC = () => {
  return (
  <>
    <img src={logoImg} alt="Github Explorer"/>
    <Title> Explore Repository no Github </Title>

    <Form>
      <input placeholder="Digite o nome do repositório" />
      <button type="submit">Pesquisar</button>
    </Form>
    <Repositories>
      <a href="teste">
        <img src="https://avatars1.githubusercontent.com/u/3595816?s=400&u=da4daf60f5c320ca5a5cae87258301d2efa907f1&v=4"
        alt="Samuel Guimarães"
        />
        <div>
          <strong>gostack-conceitos-node</strong>
          <p>Aplicação para treinar o que você aprendeu até agora no Node.js!</p>
        </div>
        <FiChevronRight size={20} />
      </a>
      <a href="teste">
        <img src="https://avatars1.githubusercontent.com/u/3595816?s=400&u=da4daf60f5c320ca5a5cae87258301d2efa907f1&v=4"
        alt="Samuel Guimarães"
        />
        <div>
          <strong>gostack-conceitos-node</strong>
          <p>Aplicação para treinar o que você aprendeu até agora no Node.js!</p>
        </div>
        <FiChevronRight size={20} />
      </a>
      <a href="teste">
        <img src="https://avatars1.githubusercontent.com/u/3595816?s=400&u=da4daf60f5c320ca5a5cae87258301d2efa907f1&v=4"
        alt="Samuel Guimarães"
        />
        <div>
          <strong>gostack-conceitos-node</strong>
          <p>Aplicação para treinar o que você aprendeu até agora no Node.js!</p>
        </div>
        <FiChevronRight size={20} />
      </a>
    </Repositories>
  </>
  )
}

export default Dashboard;
