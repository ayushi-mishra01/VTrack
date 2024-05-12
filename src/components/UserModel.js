import React, {useState} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import forge from 'node-forge';
const UserModel = ({
    opAdd,
    show,
    handleClose,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    isLocked,
    setIsLocked,
    securityQuestionId,
    setSecurityQuestionId,
    answerId,
    setAnswerId,
    roleId,
    setRoleId,
    handleSave,
    handleUpdate,
    isEmailValid,
    roles,
    handleRoleCheckboxChange
}) => {
 
    const checkboxes=roles.map((role, index) => (
        ((index+1)%4!==0)?
        <span style={{padding: "5px"}}>
        <input
            type="checkbox"
            value={role.id}
            onChange={handleRoleCheckboxChange}
            //checked={!opAdd && editRoleIds.includes(role.id)}
        />&nbsp;
        <label>{role.name}</label>
        </span>
        :
        <span style={{padding: "5px"}}>
        <input
            type="checkbox"
            value={role.id}
            onChange={handleRoleCheckboxChange}
            //checked={!opAdd && editRoleIds.includes(role.id)}
        />&nbsp;
        <label>{role.name}</label>
        <br/>
        </span>
    ))
 
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const togglePasswordVisibility1 = () => {
      setPasswordVisible1(!passwordVisible1);
    };

    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const togglePasswordVisibility2 = () => {
      setPasswordVisible2(!passwordVisible2);
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPass = e.target.value;
        setConfirmPassword(confirmPass);
        setPasswordsMatch(password === confirmPass);
    };
 
    const handleSaveOrUpdate = () => {    
        if(!passwordsMatch){
            return;
        }
        // const hashedPassword = bcrypt.hashSync(password, 10);
 
        const publicKeyPem = '-----BEGIN RSA PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDE3/DkbE+9QX8UDShJD+DALJryS3L3shC/a8i0+O1H54sVcfdVQrwH3PpIZSORy7fkDzx2IXXXMkToq9rt6cZ5fiG1ortNIQEkg2wD2Sk8Go7I4fS9A+TpMBiV8cO4c51ROV2P6QdvWMC+LC2is7+a4ihMR8Wl621Iw90nWVkAZwIDAQAB-----END RSA PUBLIC KEY-----';
 
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const encryptedPassword = window.btoa(publicKey.encrypt(password));
 
        if(opAdd) {      
            handleSave(encryptedPassword);
        }
        else{      
            handleUpdate(encryptedPassword);
        }  
    };
 
 
    return (
    <div className={`modal ${show ? 'show' : ''}`} role="dialog" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" onClick={() => { handleClose()}} aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">{opAdd ? `Add` : `Edit: ${name}`}</h4>
            </div>
        <div className="modal-body">
        <table className="custom-table" style={{width:"500px"}}>
        <tbody>
                <tr>
                    <td>Name:</td>
                    <td colSpan={3}>
                        <input type="text" className="form-control" placeholder="Enter Name:" value={name}
                        onChange={(e) => {const newName = e.target.value;
                        setName(newName);}} />
                    </td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td colSpan={3}>
                    <input type="text" className="form-control" placeholder="Enter Email:" value={email}
                    onChange={(e) => { const newEmail = e.target.value; setEmail(newEmail); isEmailValid(newEmail); }} />
                    <div id="emailV"></div>
                    </td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td colSpan={3}>
                    <input type={passwordVisible1 ? "text" : "password"} id="password" className="form-control" placeholder="Enter Password:" value={password}
                     onChange={(e) => {setPassword(e.target.value) }} />
                     <span s className="toggle-password" onClick={togglePasswordVisibility1} style={{marginLeft:"-10%"}}>
                    {passwordVisible1?  <VisibilityIcon style={{paddingTop:"2px"}}/> :<VisibilityOffIcon tyle={{paddingTop:"2px"}}/>}
                    </span>
                    </td>
                </tr>
                <td>Confirm Password:</td>
                <td colSpan={3}>
                    <input type={passwordVisible2 ? "text" : "password"} className="form-control" placeholder="Confirm Password:" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    <span s className="toggle-password" onClick={togglePasswordVisibility2} style={{marginLeft:"-10%"}}>
                    {passwordVisible2?  <VisibilityIcon style={{paddingTop:"2px"}}/> :<VisibilityOffIcon tyle={{paddingTop:"2px"}}/>}
                    </span>
                    {!passwordsMatch && <div style={{ color: 'red' }}>Passwords do not match</div>}                  
                </td>
                <tr>
                    <td>Is Locked:</td>
                    <td colSpan={3}>
                    <input type="checkbox" checked={isLocked} onChange={(e) => setIsLocked(e.target.checked)} />
                    </td>
                </tr>
                <tr>
                    <td>Security Question:</td>
                        <td colSpan={3}><select className="form-control" value={securityQuestionId} onChange={(e) => setSecurityQuestionId(parseInt(e.target.value))}>
                         </select>
                    </td>
                </tr>
                <tr>
                    <td>Answer:</td>
                    <td colSpan={3}>
                        <input type="text" className="form-control" placeholder="Enter Answer:" value={answerId}
                        onChange={(e) => { setAnswerId(parseInt(e.target.value) || 0); }}/>
                    </td>
                </tr>
                <tr>
                    <td>Role:</td>
                    <td colSpan={3}>
                        {checkboxes}
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
            <div className="modal-footer">
                <div id="validation"></div>
                <button className="styled-button"  disabled={!passwordsMatch} onClick={handleSaveOrUpdate}> Save </button>
                </div>
            </div>
        </div>
    </div>
    );
};
 
export default UserModel;