import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useTheme } from '../Context/ThemeContext';
import GoogleButton from 'react-google-button';
import {signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
const AccountCircle = () => {

const[open,setopen]=useState(false);
const[value,setvalue]=useState(0);
const {theme}=useTheme();

const navigate=useNavigate();
const [user]=useAuthState(auth);



const handleModalOpen=()=>{
  if(user){
    navigate('/user');
  }
  else
setopen(true);
}
const handleClose=()=>{
    setopen(false);
}

const handleValueChange=(e,v)=>{
    setvalue(v);
}

const logout=()=>{
  auth.signOut().then((res)=>{
    toast.success('Logged out', {
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
    toast.error('not able to log out', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  })
}

const googleProvider=new GoogleAuthProvider();
const handleGoogleSignIn=()=>{
signInWithPopup(auth,googleProvider).then((res)=>{
  toast.success('Google login successfull!', {
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
})
}

  return (
    <div>
      <div className="abcd"> <AccountCircleIcon onClick={handleModalOpen} />{user&&<LogoutIcon onClick={logout}/>}</div>
      

      <Modal open={open} onClose={handleClose}
      
       style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'

       }}

      >
       <div style={{width:'400px',textAlign:'center'}}>
        <AppBar position='static' style={{background:'transparent'}}>
           
           <Tabs
           value={value}
           onChange={handleValueChange}
           variant='fullWidth'>
           <Tab label="login" style={{color:theme.textColor}}></Tab>
            <Tab label='signup' style={{color:theme.textColor}}></Tab>
           </Tabs>
           

          
        </AppBar>
        {value===0&&<LoginForm handleClose={handleClose}/> }
        {value===1&&<SignUpForm  handleClose={handleClose}/>}
      

      <Box>
        <span>OR</span>
        <GoogleButton
        style={{width:'100%',marginTop:'12px'}}
        onClick={handleGoogleSignIn}/>
      </Box>
       </div>
      </Modal>

    </div>
  )
}

export default AccountCircle
