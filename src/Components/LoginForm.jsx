import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';

const LoginForm = () => {

const[email,setEmail]=useState('');
const[password,setpassword]=useState('');
const {theme}=useTheme();

const handleSubmit=()=>{
    if(!email||!password)
    {
        toast.warning('Fill all the details', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      return;
    }
   auth.signInWithEmailAndPassword(email,password).then((res)=>{
    toast.success('Logged In successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
   }).catch((err)=>{
    toast.error(errorMapping[err.code]||'Some error occured', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
   }); 
}
  return (
    <Box p={3}
    style={{
        display:'flex',
        flexDirection:'column',
        gap:'20px'
    }}>
        <TextField
        variant='outlined'
        type='email'
        label='Enter Email'
        onChange={(e)=>setEmail(e.target.value)}
        InputLabelProps={{
            style:{
                color:theme.textColor
            }
        }}
        InputProps={{
            style:{
                color:theme.textColor
            }
        }}/>
        <TextField
        variant='outlined'
        type='password'
        label='Enter Password'
        onChange={(e)=>setpassword(e.target.value)}
        InputLabelProps={{
            style:{
                color:theme.textColor
            }
        }}
        InputProps={{
            style:{
                color:theme.textColor
            }
        }}/>
        <Button
        variant='contained'
        size='Large'
        style={{backgroundColor:theme.textColor,
            color:theme.background}}
        onClick={handleSubmit}>Login</Button>

    </Box>
  )
}

export default LoginForm