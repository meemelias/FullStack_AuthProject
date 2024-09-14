import React, { useState } from 'react'


function Register({setAuth}) {
  
  const [input,setInput] = useState({
    email:"",
    password:"",
    name:""
  });

  const{email,password,name} = input;
  const onChange = (e) => {
    setInput({...input,[e.target.name]:e.target.value})

  };


  const onSubmitForm = async (e) =>{
    e.preventDefault();
    try {
      const body = {email,password,name};
      const response = await fetch("http://localhost:5000/auth/register",
        {
          method:"POST",
          headers:{"Content-Type" : "application/json"},
          body:JSON.stringify(body)
        });
      
      const parseRes = await response.json();
      localStorage.setItem("token",parseRes.token);
      setAuth(true);
      
      
      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (
    <div>
        <h1>Register</h1>
        <div className='form-container'>
        <form onSubmit={onSubmitForm}>
          <input onChange={e => onChange(e)} value={email} className='input-box' type="email" name = 'email' placeholder='email' />
          <input onChange={e => onChange(e)} value={password} className='input-box' type="password" name = 'password' placeholder='password' />
          <input onChange={e => onChange(e)} value={name} className='input-box' type="text" name = 'name' placeholder='name' />
          <button>Submit</button>
        </form>

        </div>
        
    </div>
  )
}

export default Register
