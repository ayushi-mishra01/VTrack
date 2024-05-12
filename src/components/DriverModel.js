import React, {useState} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import forge from 'node-forge';

const DriverModel = ({opAdd, show, handleClose, name, setName, busNo, setBusNo, mobile, setMobile, password, setPassword, longitude, setLongitude, latitude, setLatitude, handleSave, handleUpdate, clear}) => {
    const [confirmPassword,
        setConfirmPassword] = useState('');
    const [passwordsMatch,
        setPasswordsMatch] = useState(true);

    const [passwordVisible1,
        setPasswordVisible1] = useState(false);
    const togglePasswordVisibility1 = () => {
        setPasswordVisible1(!passwordVisible1);
    };

    const [passwordVisible2,
        setPasswordVisible2] = useState(false);
    const togglePasswordVisibility2 = () => {
        setPasswordVisible2(!passwordVisible2);
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPass = e.target.value;
        setConfirmPassword(confirmPass);
        setPasswordsMatch(password === confirmPass);
    };

    const handleSaveOrUpdate = () => {
        if (!passwordsMatch) {
            return;
        }

        const publicKeyPem = '-----BEGIN RSA PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDE3/DkbE+9QX' +
                '8UDShJD+DALJryS3L3shC/a8i0+O1H54sVcfdVQrwH3PpIZSORy7fkDzx2IXXXMkToq9rt6cZ5fiG1or' +
                'tNIQEkg2wD2Sk8Go7I4fS9A+TpMBiV8cO4c51ROV2P6QdvWMC+LC2is7+a4ihMR8Wl621Iw90nWVkAZw' +
                'IDAQAB-----END RSA PUBLIC KEY-----';

        const publicKey = forge
            .pki
            .publicKeyFromPem(publicKeyPem);
        const encryptedPassword = window.btoa(publicKey.encrypt(password));

        if (opAdd) {
            handleSave(encryptedPassword);
        } else {
            handleUpdate(encryptedPassword);
        }
    };

    return (
        <div
            className={`modal ${show
            ? 'show'
            : ''}`}
            role="dialog"
            style={{
            display: show
                ? 'block'
                : 'none'
        }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="close"
                            onClick={() => {
                            handleClose();
                            clear();
                        }}
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">{opAdd
                                ? `Add`
                                : `Edit: ${name}`}</h4>
                    </div>
                    <div className="modal-body">
                        <table
                            className="custom-table"
                            style={{
                            width: "500px"
                        }}>
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td colSpan={3}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Name:"
                                            value={name}
                                            onChange={(e) => {
                                            const newName = e.target.value;
                                            setName(newName);
                                        }}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Bus Number:</td>
                                    <td colSpan={3}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Bus Number:"
                                            value={busNo}
                                            onChange={(e) => {
                                            const newBusNo = e.target.value;
                                            setBusNo(newBusNo);
                                        }}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mobile:</td>
                                    <td colSpan={3}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Mobile:"
                                            value={mobile}
                                            onChange={(e) => {
                                            const newMobile = e.target.value;
                                            setMobile(newMobile);
                                        }}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Password:</td>
                                    <td colSpan={3}>
                                        <input
                                            type={passwordVisible1
                                            ? "text"
                                            : "password"}
                                            id="password"
                                            className="form-control"
                                            placeholder="Enter Password:"
                                            value={password}
                                            onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}/>
                                        <span
                                            s
                                            className="toggle-password"
                                            onClick={togglePasswordVisibility1}
                                            style={{
                                            marginLeft: "-10%"
                                        }}>
                                            {passwordVisible1
                                                ? <VisibilityIcon
                                                        style={{
                                                        paddingTop: "2px"
                                                    }}/>
                                                : <VisibilityOffIcon
                                                    tyle={{
                                                    paddingTop: "2px"
                                                }}/>}
                                        </span>
                                    </td>
                                </tr>
                                <td>Confirm Password:</td>
                                <td colSpan={3}>
                                    <input
                                        type={passwordVisible2
                                        ? "text"
                                        : "password"}
                                        className="form-control"
                                        placeholder="Confirm Password:"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}/>
                                    <span
                                        s
                                        className="toggle-password"
                                        onClick={togglePasswordVisibility2}
                                        style={{
                                        marginLeft: "-10%"
                                    }}>
                                        {passwordVisible2
                                            ? <VisibilityIcon
                                                    style={{
                                                    paddingTop: "2px"
                                                }}/>
                                            : <VisibilityOffIcon
                                                tyle={{
                                                paddingTop: "2px"
                                            }}/>}
                                    </span>
                                    {!passwordsMatch && <div
                                        style={{
                                        color: 'red'
                                    }}>Passwords do not match</div>}
                                </td>
                                <tr>
                                    <td>Longitude:</td>
                                    <td colSpan={3}>
                                        <input
                                            type="text"
                                            value={longitude}
                                            onChange={(e) => setLongitude(parseFloat(e.target.value))}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Latitude:</td>
                                    <td colSpan={3}>
                                        <input
                                            type="text"
                                            value={latitude}
                                            onChange={(e) => setLatitude(parseFloat(e.target.value))}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <div id="validation"></div>
                        <button
                            className="styled-button"
                            disabled={!passwordsMatch}
                            onClick={handleSaveOrUpdate}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverModel;