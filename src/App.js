import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/";
import Settings from "./pages/settings";
import About from "./pages/about";
import Login from "./pages/signin";
import SignUp from "./pages/signup";
import ForgotPassword from "./components/ForgotPassword";
import AddLocation from './components/AddLocation'
import "./style/Weather.css";

export default function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/sign-in" exact component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/addlocation" component={AddLocation} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}
