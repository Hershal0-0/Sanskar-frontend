import React,{Fragment} from 'react'
import "react-tippy/dist/tippy.css"
import './style/App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
// Importing Components
import Landing from './components/Landing';
import Project from './components/Project';
import Forms from './components/Forms';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import Footer from './components/Footer';
import Aboutus from './components/Aboutus';

// importing GlobalProvider
import {GlobalProvider} from './context/GlobalState'
function App() {
  return (
    <GlobalProvider>
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing}/>
        <Switch>
          <Route exact path='/projects' component={Project}/>
          <Route exact path='/forms' component={Forms}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/admin' component={Admin}/>
          <Route exact path='/aboutus' component={Aboutus}/>
        </Switch>
        <Footer style={{width:"100%"}} />
      </Fragment>
    </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
