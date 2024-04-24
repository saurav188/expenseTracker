import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";

function Logout(navigate, sessionStorage){
    sessionStorage.removeItem('moneyTrackertoken');
    navigate("/login");
}

export default Logout;