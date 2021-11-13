import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import Home from './pages/home';
import Settings from './pages/settings';
import About from './pages/about';
import Login from "./components/Login"
import Signup from "./components/Signup";
import ForgotPassword from './components/ForgotPassword'
import './style/Weather.css';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/sign-up" exact component={Signup} />
            <Route path="/sign-in" exact component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
