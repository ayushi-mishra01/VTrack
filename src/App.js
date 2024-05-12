import React, { useState } from 'react';
import axios from "axios";
import './style.css';
import Home from './components/Home';
import LoginForm from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Student from './components/Student'
import {baseURLUser, baseURLDriver} from './configurations';
import User from './components/User';
import Role from './components/Role';
import Driver from './components/DriverManagement';
import LocationTracker from './components/LocationTracker';
 
function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(0);
  const [userRole, setUserRole] = useState([]);
  const [userName, setUserName] = useState('');
  const [manage, setManage] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
 
  const handleLogin = (userId, role) => {
    setId(userId);
    setIsLoggedIn(true);
    setUserRole(role);
    setSelectedRole(role[0]);

    (selectedRole!=='Driver')?
      axios.get(baseURLUser+`/${userId}`)
        .then((result) => {
          console.log(result);
          setUserName(result.data[0].name);
      })
      .catch((error)=>{
        console.error(error);
      })
    :
      axios.get(baseURLDriver+`/${userId}`)
        .then((result) => {
          console.log("Driver's data: "+result);
          setUserName(result.data.name);
      })
      .catch((error)=>{
        console.error(error);
      })
  };
 
  const handleRoleChange = (e)=>{
    setSelectedRole(e.target.value);
  };

  const getRoleComponent = (role) => {
    let component;

    switch (role) {
      case 'Admin':
        switch (manage) {
          case '':
            component = <Home userName={userName} selectedRole={selectedRole} />;
            break;
          case 'user':
            component = <User/>;
            break;
          case 'role':
            component = <Role/>;
            break;
          case 'driver':
            component = <Driver/>;
            break;
          default:
            component = <Home userName={userName} selectedRole={selectedRole} />;
        }
        break;
      case 'Student':
        component = <Student userName={userName} selectedRole={selectedRole}/>;
        break;
      case 'Driver':
        component = <LocationTracker id={id} userName={userName} selectedRole={selectedRole}/>;
        break;
      default:
        component = <Student userName={userName} selectedRole={selectedRole}/>;
    }

    return component;
  };


  return (
    <div>
      {/* <LocationTracker/> */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={userName} userRole={userRole} onSelectRole={handleRoleChange}  
      setManage={setManage} selectedRole={selectedRole}/>

      {!isLoggedIn ?
        (
          <LoginForm onLogin={handleLogin} />
        )
        :
        (
          getRoleComponent(selectedRole)
        )
      }
      <Footer/>
    </div>
  );
}
 
export default App;

