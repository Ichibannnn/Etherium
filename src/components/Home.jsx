import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import request from "../services/request";
// {
//   <Outlet /> 
// }
const Home = () => {

  const [rawmats, setRawmats] = useState([]);

  const getHandler = async () => {
    const response = await request.get(
      "RawMaterial/GetAllRawMaterials"
    );

    return response.data;
  };
  

  const getHandlerData = () => {
    getHandler().then((res) => {
      
      setRawmats(res);
      console.log(res)
    });
  };
  

  useEffect(() => {
    getHandlerData();

    return () => {
      setRawmats([]);
    };
  }, []);
  console.log(rawmats);

  return (
    
    <div className="home-main">
      {/* <h1>Login</h1> */}
      <div className="sidebar">
        <Link to="/">
          <button className="btn-start">Home</button>
        </Link>
        <Link to="/todolist">
          <button className="btn-start">Go to Todo List page</button>
        </Link>
        <Link to="/customers">
          <button className="btn-start">Customers</button>
        </Link>
        
      </div>
      
      <table border="1px solid black">
        <thead>
          <td>Id</td>
          <td>Item Name</td>
          <td>Item Description</td>
          <td>Item Category</td>
        </thead>
        <tbody>
          {rawmats.map((showData) => (
            <tr>
              <td>{showData.id}</td>
              <td>{showData.itemCode}</td>
              <td>{showData.itemDescription}</td>
              <td>{showData.itemCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
     
      
    </div>
  );
};

export default Home;
