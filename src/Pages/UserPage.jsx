import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph';
import UserInput from '../Components/UserInput';

const UserPage = () => {
 
 
 const[data,setData]=useState([]);
 const[graphdata,setgraphdata]=useState([]);
 const[dataLoading,setdataLoading]=useState(true);

 const[user,loading]=useAuthState(auth);
 const navigate=useNavigate();



 const fetchUserData=()=>{
   const resultsRef=db.collection('Results');
   const {uid}=auth.currentUser;
   let tempData=[];
   let tempGraphData=[];
   resultsRef.where('userId','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
      snapshot.docs.map((doc)=>{
        tempData.push({...doc.data()});
        tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0],doc.data().wpm]);
      });
      setData(tempData);
      setgraphdata(tempGraphData.reverse());
      setdataLoading(false);
      console.log(tempData);
   });


 };
 
 useEffect(()=>{
    if(!loading){
        fetchUserData();
    }
    if(!loading&&!user)
    {
navigate('/');
    }
   
 },[loading]);
 
 if(loading||dataLoading){
    

    return  <div className='center-of-screen'><CircularProgress/></div>
   
 }
 
    return (
   <div className="canvas">
    <UserInput totalTestsTaken={data.length}/>
    <div className="graph-user-page">
    <Graph graphData={graphdata} />
    </div>

    <TableUserData data={data}/>
   </div>
  )
}

export default UserPage
