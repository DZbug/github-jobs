import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Job from './components/jobs/Job';
import GithubState from './context/github/GithubState';

import './App.scss';

function App() {
  return (
    <GithubState>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/job/:id' component={Job} />
        </Switch>
      </Router>
    </GithubState>
  );
}

export default App;
