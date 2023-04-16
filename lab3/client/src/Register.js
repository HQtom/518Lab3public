import React, {useState, useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './Auth'
const Register = ()=>{
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [name,setname] = useState("");
    const  currentUser  = useContext(AuthContext);
    const navigate = useNavigate();
    const SignUp = async (e, p) => {
        let a = email;
        let b = password;
        let c = name;
      console.log(a,b);
      try {
        let data = await axios.post("http://ec2-3-91-150-109.compute-1.amazonaws.com:4000/register",{name:c,email:a,password:b});
        //let data = {email:a,password:b,name:c};
        if(data.data.msg){
          alert(data.data.msg)
        }else{
          currentUser.setLogin(data);
        console.log(data);
        }
        
        
      } catch (err) {
        alert(err)
      }
      navigate('/');
    }
    return (
       
          <><div className="row-2 ">
             <label htmlFor="username">User name</label>
            <input type="text" id={"user"} onChange={(event) => setname(event.target.value)} />
           
        </div >
        <div className="row-4 "> <label htmlFor="username">User email</label>
            <input type="text" id={"username"} onChange={(event) => setemail(event.target.value)} />
            </div>
        <div className="row-6 ">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(event) => setpassword(event.target.value)} />
            </div>
            <div className="row-8 "><button onClick={() => SignUp()}>Sign Up</button></div>
            </>
          
        
      );
  

}
export default Register