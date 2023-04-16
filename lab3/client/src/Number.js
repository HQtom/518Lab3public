import React,{useEffect,useState,useContext} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import img from './image/image.png'
import img2 from './image/FISH.jpg'
import { AuthContext } from './Auth'
import { Link, useNavigate } from "react-router-dom";
const Number = ()=>{
    const  currentUser  = useContext(AuthContext);
    const navigate = useNavigate();
    const[num,setnum]=useState(undefined)// state var to get number from backend

    const[num2,setsum]=useState(undefined)// state var of front end

    const[profile1,setp1]=useState("Haowei Qing")//state of name part
    
    const[profile2,setp2]=useState("Personal profile is empty. Please type :)")//state of description
    
    let result = 0
    const resNum = async() =>{
        let a = document.getElementById('num').value
        let b = document.getElementById('num2').value
        try{
            let data = await axios.post("http://ec2-3-91-150-109.compute-1.amazonaws.com:4000/Num",{Num:a,Num2:b})//post numbers to server
            console.log(data)
            setnum(data.data.Num)// calculate sum from server
            setsum(parseInt(a)+parseInt(b))//calculate addition in reactJS
        }catch(e){
            console.log(e)
        }  
        // this.setState({
        //     sum: parseInt(a)+parseInt(b)
        // })    
    }
    const handleChange = (event) =>{
        setp1(event.target.value)
    }
    const handleChange2 = (event) =>{
        setp2(event.target.value)
    }
   //<a className="navbar-brand" href="/Login">Go to Log in</a>
    return(
        
        <><div>
            
            <nav className="navbar navbar-expand-sm bg-secondary navbar-dark" role="navigation">
            <a className="navbar-brand" href="#">
            <img src={img} alt="logo" ></img>
                </a>

                <div className="container-fluid">
                    <div className="navbar-header">
                    <button onClick={()=>{navigate('/CreateInventory')}}>Go to Inventory</button>
                    </div>
                    <div className="navbar-header">
                        <button onClick={()=>{navigate('/Login')}}>Go to Log in</button>
                        
                    </div>
                    <div className="navbar-header">
                    <button onClick={()=>{navigate('/Register')}}>Go to Sign up</button>
                    </div>
                    <div className="navbar-header">
                    <button onClick={()=>{navigate('/Profile')}}>Go to Log in info</button>
                    </div>
                    <div>
                        <ul className="nav-item active">
                            <li className="active"><a>Hello I am Haowei Qing</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

        <div className="container-fluid mt-3">
                
            
        <div className="row">
            <div className="col-sm-4 bg-secondary">
                <img decoding="async" src={img2} ></img>
                </div>
            <div className="col-6 ">
                <input type="text" value={profile1} onChange={handleChange} style={{ width: 400 }} className="p1"/> 
                <p className="p1">{profile1 }</p>
                <textarea type="text" value={profile2} onChange={handleChange2} style={{height: 200, width: 400} }/> 
                </div>
            
        </div>
        </div>
            <div>
            
                <p><input type="number" id="num" step="1" placeholder='Enter Your number ' /></p>
                <p><input type="number" id="num2" step="1" placeholder='Enter Your second number ' /></p>

                <button
                    className="SubmitButton"
                    onClick={resNum}>
                    submit
                </button>
                <p>
                    Number from server is:{num}
                </p>

                <p>
                    Number from ReactJS is:{num2}
                </p>
            </div></>
        
    )
}


export default Number

















//const[sum,setsum]=useState(undefined)

    // useEffect(()=>{
    //     async function fetchData(){
    //         try{
    //             let data1 = await axios.get("http://localhost:4000")
    //             setnum2(data1.data.Num2)
    //             console.log(data1)
    //         }catch(e){
    //             console.log(e)
    //         }
    //     }
    //     fetchData();
    // },[])
    // let firstNo = parseInt(req.params.firstNumber),
    //   secondNo = parseInt(req.params.secondNumber);