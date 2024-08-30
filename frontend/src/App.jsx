import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Chatroom from './components/Chatroom';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/chatroom/:id" component={Chatroom} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;