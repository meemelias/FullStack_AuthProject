import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom' 
function Login({setAuth}) {
  const [inputs,setInputs] = useState({
    email:"",
    password:""
  });

  const{email,password} = inputs;

  const onChange =  (e) =>{
    setInputs({...inputs,[e.target.name]:e.target.value});
  }

  const onSubmitForm = async(e) =>{
    e.preventDefault();
    try {
      const body = {email,password};
      const response = await fetch("http://localhost:5000/auth/login",
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(body)
        }

      );
      const parse = await response.json();
      localStorage.setItem("token",parse.token);
      setAuth(true);

      
    } catch (error) {
      console.log(error.message);
      
    }
  }
 
  return (
    <div>
      <h1> Login </h1>
      <form onSubmit={onSubmitForm}>
        <input type="email"  onChange={(e) => onChange(e)} value={email} name="email" placeholder="email" />
        <input type="password"  onChange={(e) => onChange(e)} name="password" value={password} placeholder="password" />
        <button>Submit</button>

      </form>
      <Link to='/register'> Register</Link>
    </div>
  )
}

export default Login
