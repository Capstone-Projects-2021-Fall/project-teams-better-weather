import React from 'react';

import './style/Weather.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages';
import Settings from './pages/settings';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/settings" exact component={Settings} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;