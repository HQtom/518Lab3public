import React, {useState, useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './Auth'
const Login = ()=>{
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const  currentUser  = useContext(AuthContext);
    const navigate = useNavigate();
    const SignIn = async (e, p) => {
        let a = email;
        let b = password;
      console.log(a,b);
      try {
        
        let data = {email:a,password:b};//
        let res = await axios.post("http://ec2-3-91-150-109.compute-1.amazonaws.com:4000/login",{email:a,password:b});
        if(res.data.msg){
          alert(res.data.msg)
        }else{
        console.log(res.data);
        currentUser.setLogin(res.data);
        console.log(currentUser);
        navigate('/Profile');
        }
        
        
      } catch (err) {
        alert(err)
      }
      
    }
    return (
      
          <><div className="row-2 ">
            <label htmlFor="username">User email</label>
            <input type="text" id={"username"} onChange={(event) => setemail(event.target.value)} />
        </div><div className="row-6 ">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(event) => setpassword(event.target.value)} />
            </div>
            <div className="row-8"><button onClick={() => SignIn()}>sign in</button></div>
            </>
          
        
      );
  

}
export default Login;