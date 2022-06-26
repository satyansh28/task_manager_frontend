import { Redirect, Route,Switch } from 'react-router-dom';
import './App.css';
import NavHeader from './components/NavHeader';
import Taskspage from './components/Taskspage';
import Loginpage from './components/Loginpage';
import Regpage from './components/Registerpage';
import logincontext from './store/logincontext';
import { useState } from 'react';
function App() {
  const [loginstate,setloginstate]=useState({});
  return (
    <logincontext.Provider value={{loginstate,setloginstate}}>
    <NavHeader/>
    <Switch>
      <Route path="/login">
        <Loginpage/>
      </Route>
      <Route path="/register">
        <Regpage/>
      </Route>
      <Route path="/notes">
        <Taskspage />
      </Route>
      <Route path="*">
        <Redirect to="/login"/>
      </Route>
    </Switch>
    </logincontext.Provider>
  );
}

export default App;
