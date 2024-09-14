import React, { useEffect, useState } from 'react'

function Dashboard({setAuth}) {
  const[name,setName] = useState('');
  const[isLoading,setIsLoading] = useState(true);
  
  async function getName(){
    try {
      const response = await fetch('http://localhost:5000/dashboard/',{
        method:"GET",
        headers:{token:localStorage.token}

      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
      
    } catch (error) {
      console.log(error.message);
      
    }
    finally{
      setIsLoading(false);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  }

  useEffect(() =>{
    getName();
  },[])

if(isLoading){
  return <div>
    Loading............
  </div>
}

  return (
    <div>
        <h1>Hi Welcom {name}</h1>
        <button onClick={e => logout(e)}>Logout</button>
        
    </div>
  )
}

export default Dashboard
