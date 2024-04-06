// import React,{useState} from 'react'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import {toast} from 'react-toastify'
// import AxiosService from '../utils/ApiService';
// import { useNavigate } from 'react-router-dom';
// function SignIn() {
//   let [email,setEmail] = useState("")
//   let [password,setPassword] = useState("")
//   let navigate = useNavigate()
//   let handleLogin = async()=>{
//     try {
//       let res = await AxiosService.post(`/user/login`,{
//         email,
//         password
//       })
//       if(res.status===200)
//       {
//         toast.success(res.data.message)
//         sessionStorage.setItem('token',res.data.token)
//         sessionStorage.setItem('userData',JSON.stringify(res.data.userData))
        
//         if(res.data.userData.role === 'admin')
//         {
//             navigate('/dashboard')
//         }
//         else
//         {
//             navigate('/home')
//         }
//       }
//     } catch (error) {
//       toast.error(error.response.data.message)
//     }
//   }
//   const navigateToSignUp = () => {
//     navigate('/signup'); 
//   };
//   return <>
//   <div className='background-container'>
//     <h1 style={{textAlign:"center"}}>Login Here!</h1>
//   <Form className='label'>
//       <Form.Group className="mb-3">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
//       </Form.Group>
//       <Button variant="primary" onClick={handleLogin}>
//         SignIn
//       </Button>&nbsp;&nbsp;
//       <Button variant="primary" onClick={navigateToSignUp}>
//         SignUp
//       </Button>
//     </Form>
//   </div>
//   </>
// }

// export default SignIn

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import AxiosService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let res = await AxiosService.post(`/user/login`, {
        email,
        password
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('userData', JSON.stringify(res.data.userData));

        if (res.data.userData.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/home');
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const navigateToSignUp = () => {
    navigate('/signup');
  };

  const handleGetGuestCredentials = () => {
    setEmail('sang@gmail.com');
    setPassword('sang123');
  };

  const handleGetAdminCredentials = () => {
    setEmail('admin@gmail.com');
    setPassword('123456');
  };

  return (
    <>
      <div className='background-container'>
        <h1 style={{ textAlign: 'center' }}>Login Here!</h1>
        <Form className='label'>
          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' onClick={handleLogin}>
            SignIn
          </Button>
          &nbsp;&nbsp;
          <Button variant='primary' onClick={navigateToSignUp}>
            SignUp
          </Button>&nbsp;&nbsp;
          <Button variant='primary' onClick={handleGetGuestCredentials}>
            Get Guest User Credentials
          </Button>&nbsp;&nbsp;
          <Button variant='primary' onClick={handleGetAdminCredentials}>
            Get Guest Admin Credentials
          </Button>
        </Form>
      </div>
    </>
  );
}

export default SignIn;
