import { Redirect, Route,Switch } from 'react-router-dom';
import './App.css';
import NavHeader from './components/NavHeader';
import Taskspage from './components/Taskspage';
import Loginpage from './components/Loginpage';
import Regpage from './components/Registerpage';
import logincontext from './store/logincontext';
import { useState } from 'react';
const frontend_part="";
function App() {
  const [loginstate,setloginstate]=useState({});
  return (
    <logincontext.Provider value={{loginstate,setloginstate}}>
    <NavHeader/>
    <Switch>
      <Route path={`${frontend_part}/login`}>
        <Loginpage/>
      </Route>
      <Route path={`${frontend_part}/register`}>
        <Regpage/>
      </Route>
      <Route path={`${frontend_part}/notes`}>
        <Taskspage />
      </Route>
      <Route path="*">
        <Redirect to={`${frontend_part}/login`}/>
      </Route>
    </Switch>
    </logincontext.Provider>
  );
}

export default App;
