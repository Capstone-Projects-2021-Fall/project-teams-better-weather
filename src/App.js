import React from 'react';
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage"
import Signup from "./components/Signup";
import Login from "./components/Login"
import ForgotPassword from './components/ForgotPassword.js'

function App() {
  return (
    <div>
      <Router> 
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
