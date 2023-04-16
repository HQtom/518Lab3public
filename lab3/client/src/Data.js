import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Link, useNavigate } from "react-router-dom";

import { Space, Table, Tag } from 'antd';
const Data = () => {
    const [fdata, setData] = useState(undefined);
    useEffect(() => {
        const getUsers = async () => {
            try {
                let  data  = await axios.get("http://ec2-3-91-150-109.compute-1.amazonaws.com:4000/fakedata");
                setData(data.data.data);
                console.log(data);
                if (data.length == 0) {
                    alert("Inventory is emtpy now");
                }
            } catch (e) {
                console.log(e);
            }
        }
        getUsers();

    }, []);
    const colums = [
        {
            title: 'title',
            dataIndex: 'title'
        },
        {
            title: 'description',
            dataIndex: 'description'
        },
        {
            title: 'img',
            dataIndex: 'url'
        }
     
    ]
 
    // const print = (user) => {

    //     return (<div>
    //         <img src={user.url} />
    //         <h3>{user.title}</h3>
    //         <h3>{user.description}</h3>
    //     </div>

    //     );
    // }

    // //let fdata = await axios.get("http://localhost:4000/fakedata");

   // let data1 = fdata && fdata.map((each) => { return print(each) });
    return (<div>
        <p>
        <div>
          
         <Table dataSource={fdata} columns={colums} />
           
        </div>
    
    </p>
    </div>)


}

export default Data;