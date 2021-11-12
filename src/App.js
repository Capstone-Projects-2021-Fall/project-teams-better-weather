import React from 'react';

import './style/Weather.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages';
import Settings from './pages/settings';
import Signup from './pages/signup';
import About from './pages/about';
import Signin from './pages/signin';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/sign-up" exact component={Signup} />
          <Route path="/sign-in" exact component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;