import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Link, useNavigate } from "react-router-dom";


const CreateInventory = () => {
    const currentLocation = window.location;
    const [users, setUsers] = useState(undefined);
    const [updateCheck, setCheck] = useState(false)
    const [UpdateName, setUpdateName] = useState(undefined)
    const [UpdateQuantity, setUpdateQuantity] = useState(undefined)
    //const [alert, setAlert] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        const getUsers = async () => {
            try {
                let { data } = await axios.get("http://ec2-3-91-150-109.compute-1.amazonaws.com:4000/users");
                setUsers(data);
                if (data.length == 0) {
                    alert("Inventory is emtpy now");
                }
            } catch (e) {
                console.log(e);
            }
        }
        getUsers();

    }, []);
    const create = async () => {

        let a = document.getElementById('name').value
        let b = document.getElementById('quantity').value
        // let c = document.getElementById('image').value
        let formData = new FormData()
        let filedata = document.getElementById('image').files
        console.log(filedata)
        Object.keys(filedata).forEach((imagedata) => {
            formData.append('file', filedata[imagedata])
        })
        if (a == '' || b == '' || filedata.length == 0) {
            alert('Your input is not valid');

        } else {
            try {
                let img = await axios.post("http://ec2-3-91-150-109.compute-1.amazonaws.com:4000/upload", formData);
                console.log(img);
                console.log(111)
                let data = await axios.post("http://ec2-3-91-150-109.compute-1.amazonaws.com:4000/create", { name: a, quantity: b, image: img.data.pid[0] })//post numbers to server
                console.log(1)
                //navigate('/CreateInventory');
                currentLocation.reload();

            } catch (e) {
                alert('Your input is not valid');
                console.log(e)
            }
        }

    }
    const handleChange1 = (e) => {
        setUpdateName(e.target.value);
    }
    const handleChange2 = (e) => {
        setUpdateQuantity(e.target.value);
    }
    const update = async (user) => {
        //let name = document.getElementById('update_name').value
        //let quantity = document.getElementById('update_quantity').value
        console.log(UpdateName, UpdateQuantity);

        if (user.name == '' || user.quantity == '') {
            alert("invalid input, please check your input data");
        } else {
            try {
                await axios.post("http://ec2-3-91-150-109.compute-1.amazonaws.com:4000/update", { _id: user, name: UpdateName, quantity: UpdateQuantity });
                currentLocation.reload();
            } catch (e) {
                console.log(e)
            }
        }

    }

    const check = () => {

        setCheck(!updateCheck);
    }

    const Delete =async (user) =>{
        try {
            await axios.post("http://ec2-3-91-150-109.compute-1.amazonaws.com:4000/delete", { _id: user });
            currentLocation.reload();
        } catch (e) {
            console.log(e)
        }

    }
    const goData = () =>{
        navigate('/data')
    }
    const print = (user) => {

        return (<div>
            <img src={"http://http://ec2-3-91-150-109.compute-1.amazonaws.com:4000/files/" + user.image} />
            <h3>{user.name}</h3>
            <h3>{user.quantity}</h3>
            <button
                onClick={() => Delete(user._id)}>
                Delete</button>
            <button
                onClick={check}>
                Update</button>
            {updateCheck && <div>
                <p><input type="text" id="update_name" placeholder='Enter Your update Inventory Name ' onChange={handleChange1} /></p>
                <p><input type="number" id="update_quantity" step="1" placeholder='Enter Your update Quantity ' onChange={handleChange2} /></p>
                <button
                    onClick={() => update(user._id)}>
                    submit</button>
            </div>
            }
        </div>

        );
    }

    let data = users && users.map((each) => { return print(each) })
   


        return (
            <div>
                <div>

                    <nav className="navbar navbar-expand-sm bg-secondary navbar-dark" role="navigation">
                        <a className="navbar-brand" href="#">
                        </a>

                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">Inventory System</a>
                            </div>
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/">Go back to main page</a>
                            </div>
                            <div>
                                <ul className="nav-item active">
                                    <li className="active"><a>Hello I am Haowei Qing</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <p>Welcome to Inventory Create</p>
                <button
                    onClick={() => goData()}>
                    Go to 3rd party API data page</button>
                <p><input type="text" id="name" placeholder='Enter Your Inventory Name ' /></p>
                <p><input type="number" id="quantity" step="1" placeholder='Enter Your Quantity ' /></p>
                <p><input type="file" id="image" placeholder='Choose your image ' /></p>
                <button
                    className="SubmitButton"
                    onClick={create}>
                    Create Inventory
                </button>
                {data}

            </div>


        );
    }

    export default CreateInventory;