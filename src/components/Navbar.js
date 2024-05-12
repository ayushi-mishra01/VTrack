import React from 'react';
import logo from './img4.png'; 

const Navbar = ({isLoggedIn, setIsLoggedIn, userName, userRole, onSelectRole, setManage, selectedRole}) => {

  const roleOptions=userRole.map((item)=>(
    <option >{item}</option>
  ));

  return (
    <div>
    <nav className="navbar">
      <div className="navbar-container">
      <ul>
        <li><img src={logo} alt="Logo" className="navbar-logo" /></li>
        <li><a href="#about">About</a></li>
        {isLoggedIn && (selectedRole==='Admin' || userRole.includes('Admin')) ? (
          <div>
            <li><button onClick={()=>{setManage('');}}>Home</button></li>
            <li>
            <button onClick={()=>{setManage('user');}} >User</button>
            </li>
            <li>
            <button onClick={()=>{setManage('role');}} >Role</button>
            </li>
            <li>
            <button onClick={()=>{setManage('driver');}} >Driver</button>
            </li>
            <li>
            <select onChange={onSelectRole}>
              <option>View As</option>
              {roleOptions}
            </select>
            </li>
            <li>
              <button onClick={()=>{setIsLoggedIn(false)}} >Logout</button> 
              {/* <a href="http://localhost:3000/">Logout</a> */}
            </li>
          </div>
          )
          :
          (
          <div>
            {isLoggedIn && (
              <div>
            <li>
            <select onChange={onSelectRole}>
              <option>View As</option>
              {roleOptions}
            </select>
            </li>
            <li>
            <button onClick={()=>{setIsLoggedIn(false)}} >Logout</button>
            {/* <a href="http://localhost:3000/">Logout</a> */}
            </li>
            </div>
            )}
          </div> 
          )
          }
          {/* <li style={{marginLeft:"20%"}}>{userName}</li> */}
      </ul>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;