import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";

function Logout(navigate, sessionStorage){
    console.log('logout')
    // const navigate = useNavigate();
    console.log('1')
    // useEffect(()=>{
        sessionStorage.removeItem('moneyTrackertoken');
        console.log('2')
        navigate("/login");
    // },[]);
}

export default Logout;