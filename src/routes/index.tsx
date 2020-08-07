import React from 'react';
import { Switch,  Route} from 'react-router-dom';

import Repository from '../pages/Repository';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  //O Switch garante a execução de uma unica rota
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/repositories/:repository+" component={Repository} />
  </Switch>
)

export default Routes;
