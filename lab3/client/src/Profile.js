import React,{useEffect,useState,useContext} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import img from './image/image.png'
import img2 from './image/FISH.jpg'
import { AuthContext } from './Auth'
const Profile = ()=>{
    const  currentUser  = useContext(AuthContext);
    let a = currentUser.currentUser.email;
    let b = currentUser.currentUser.name;
    console.log(currentUser.currentUser);
    return(

        <><p>User Information</p>
        <div className='row-2'>User name: {b}</div>
        <div className='row-4'>User email: {a}</div></>
    )
}
export default Profile
