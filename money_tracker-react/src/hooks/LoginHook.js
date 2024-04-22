import {useEffect,useState} from 'react';

function LoginHook(data){
    let url = 'http://localhost:8000/api/auth/user/login/';
    let header = {
      "Content-Type": "application/json",
    }
    useEffect(()=>{
        async function AllTaskLoginHook(url){
            const response = await fetch(url,{
                method: "POST", 
                headers: header,
                // mode: "no-cors",
                body: JSON.stringify(data),
              });
            const json_response=await response.json();
        };
    },[url]);

    const [token,setToken]=useState([]);
    return [token,setToken];
}

export default LoginHook;