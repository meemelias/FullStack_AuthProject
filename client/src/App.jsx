import { useEffect, useLayoutEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route,Link, Navigate} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  
  const setAuth = boolean =>{
    setIsAuthenticated(boolean);

  };

  async function isAuth(){
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify",{
        method:"GET",
        headers:{token:localStorage.token}
      });
      
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect(() => {
    isAuth()
  },[])

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />

        <Route exact path='/login'  element={ !isAuthenticated ? <Login setAuth ={setAuth}/>: <Navigate to='/dashboard' replace/>} />
        <Route exact path = '/register' element={ !isAuthenticated ? <Register setAuth ={setAuth}/>: <Navigate to='/dashboard' replace/>}/>
        <Route exact path = '/dashboard' element={ isAuthenticated ? <Dashboard setAuth ={setAuth}/>: <Navigate to='/login' replace/>}/>
        
      </Routes>
    </Router>

    </>
  )
}

export default App
