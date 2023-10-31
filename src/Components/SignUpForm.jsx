import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
// import {createUserWithEmailAndPassword} from "firebase/auth"

const SignUpForm = () => {

const[email,setEmail]=useState('');
const[password,setpassword]=useState('');
const[cpassword,setcpassword]=useState('');
const {theme}=useTheme();

const handlesubmit=({handleClose})=>{
  if(!email||!password||!cpassword)
  {
    toast.warning('Fill all the details', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return;
  }
  if(password!=cpassword)
  {   toast.warning('Password doesnt match', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    return;
  }
//   const authh = auth();
// createUserWithEmailAndPassword(authh, email,password)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });




  // try{
  //   const user=await createUserWithEmailAndPassword(auth,email,password);
  //   console.log(user);
  // }catch(error)
  // {
  //   alert("error");
  // }
 


  auth.createUserWithEmailAndPassword(email,password).then((res)=>{
    toast.success('User Created successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      handleClose();
  }).catch((err)=>{
    console.log(err);
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
      }}
        />
            <TextField
        variant='outlined'
        type='password'
        label='Enter Confirm Password'
        onChange={(e)=>setcpassword(e.target.value)}
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
          onClick={handlesubmit}>SignUp</Button>
 
    </Box>
  )
}

export default SignUpForm
