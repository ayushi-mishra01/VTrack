import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import login from './login3.png';
import bg from './bg.jpg';
import {baseLogin} from '../configurations';
import forge from 'node-forge';
import axios from "axios";

  function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
 
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
 
    const handleSubmit = async (e) => {
      const publicKeyPem = '-----BEGIN RSA PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDE3/DkbE+9QX8UDShJD+DALJryS3L3shC/a8i0+O1H54sVcfdVQrwH3PpIZSORy7fkDzx2IXXXMkToq9rt6cZ5fiG1ortNIQEkg2wD2Sk8Go7I4fS9A+TpMBiV8cO4c51ROV2P6QdvWMC+LC2is7+a4ihMR8Wl621Iw90nWVkAZwIDAQAB-----END RSA PUBLIC KEY-----';

      const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
      const encryptedPassword = window.btoa(publicKey.encrypt(password));

      console.log(encryptedPassword);

      e.preventDefault();
      try {
        const response = await axios.post(baseLogin + '/frontend', {
          Email: email,
          Password: encryptedPassword
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          onLogin(data.userId, data.role);
        } else {
          setError('Invalid email or password');
        }
      } catch (error) {
        setError('Error occurred while logging in');
      }
    };

    return (
      <div>
        <div style={{float:"left", width:"30%" ,marginTop:"7%"}}>
          <img src={login} alt="logo" style={{width:"750px", height:"500px"}}/>
        </div>
        <div style={{float:"right", width:"70%"}}>
        <div className="login-container" style={{backgroundImage: `url(${bg})`}}>
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label>Email/Number:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="input-field">
              <label>Password:</label> <input type={passwordVisible ? "text" : "password"}
                id="password" name="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
                <span s className="toggle-password" onClick={togglePasswordVisibility} style={{position: 'absolute', top: '67%', right: '10px', transform: 'translateX(-115%)'}}>
                {passwordVisible?  <VisibilityIcon style={{paddingTop:"2px"}}/> :<VisibilityOffIcon tyle={{paddingTop:"2px"}}/>}
                </span>
            </div>
            <button type="submit" className="styled-button">Login</button>
          </form>
        </div>
        </div>
      </div>
    );
  }
export default LoginForm;