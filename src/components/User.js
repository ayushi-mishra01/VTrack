import React, {useState, useEffect} from "react";
import axios from "axios";
import {baseURLUser, baseURLRole} from '../configurations';
import {toast} from 'react-toastify';
import ConfirmationPopup from './Confirmation';
 
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UserModel from "./UserModel";
 
const User = ()=> {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLocked, setIsLocked] = useState(0);
    const [securityQuestionId, setSecurityQuestionId] = useState(0);
    const [answerId, setAnswerId] = useState(0);
    const [roleId, setRoleId] = useState(0);
 
    const [editId, setEditId] = useState(0);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editIsLocked, setEditIsLocked] = useState(0);
    const [editSecurityQuestionId, setEditSecurityQuestionId] = useState(0);
    const [editAnswerId, setEditAnswerId] = useState(0);
    const [editRoleId, setEditRoleId] = useState(0);
 
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () =>setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [emailOfEditUser, setEmailOfEditUser] = useState('');
 
    const [data, setData] = useState('');

    const [selectedIds, setSelectedIds] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedRoleIds, setSelectedRoleIds] = useState([]);
    const [roles, setRoles] = useState();
 
    useEffect(()=>{
        getData();
        getRoles();
    }, []);
 
    const getData = () => {
        axios.get(baseURLUser+"/Proc")
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const getRoles = () => {
        axios.get(baseURLRole)
        .then((result) => {
            setRoles(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const isEmailValid=(email)=>{
        const emailRegex=/^[a-zA-Z0-9_]+[@][a-z]+[.][a-z]{2,3}$/;
        if (!emailRegex.test(email)) {
            document.getElementById("emailV").innerHTML ="Enter valid email*";
        }
        else{
            document.getElementById("emailV").innerHTML ="";
        }
    }

    const checkEmail = async (emailPara) => {
        try {
          const response = await axios.get(baseURLUser + `/CheckEmail/${emailPara}`);
          return response.data.exists;
        } catch (error) {
          console.error('Error checking email:', error);
        }
      };
 
    const handleSave = async (hash) =>{
        const concatinatedRoles = selectedRoleIds.join(',');
        const data = {
            "name": name,
            "email": email,
            "password": hash,
            "isLocked": isLocked,
            "securityQuestionId": securityQuestionId,
            "answerId": answerId,
            "roleId": concatinatedRoles
        };

        try {
        await axios.post(baseURLUser+'/frontend', data);
            getData();
            clear();
            setSelectedRoleIds([]);
            handleCloseAdd();
            //toast emitter
            toast.success('User added.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.error('Error occurred while saving:', error);
            //toast emitter
            toast.error(error.message || 'An error occurred while saving.');
        }
    };
    
    const clear = () =>{
        setName('');
        setEmail('');
        setPassword('');
        setSecurityQuestionId(0);
        setAnswerId(0);
        setIsLocked(0);
        setRoleId(0);

        setEditId(0);
        setEditName('');
        setEditEmail('');
        setEditPassword('');
        setEditSecurityQuestionId(0);
        setEditAnswerId(0);
        setEditIsLocked(0);
        setEditRoleId(0);
 
    }

    const handleEdit = (id) =>{
        handleShowEdit();
        axios.get(baseURLUser+`/${id}`)
        .then((result)=>{
            setEditName(result.data[0].name);
            setEditEmail(result.data[0].email);
            setEditPassword(result.data[0].password);
            setEditSecurityQuestionId(result.data[0].securityQuestionId);
            setEditAnswerId(result.data[0].answerId);
            setEditIsLocked(result.data[0].isLocked);
            setEditRoleId(result.data[0].roleId);
            setEditId(id);

            setEmailOfEditUser(result.data[0].email);
               
        })
        .catch((error)=>{
            toast.error(error);
        })
    }
 

    const handleUpdate = async (hash) =>{
        const concatinatedRoles = selectedRoleIds.join(',');
        const data = {
            "id": editId,
            "name": editName,
            "email": editEmail,
            "password": hash,
            "isLocked": editIsLocked,
            "securityQuestionId": editSecurityQuestionId,
            "answerId": editAnswerId,
            "roleId": concatinatedRoles
        }
 
        try {
        // const eEmailExists= await checkEmail(editEmail);
        // if (emailOfEditUser!==editEmail && eEmailExists) {
        //     document.getElementById("validation").innerHTML = "Email already exists."
        //     return;
        // }
 
        await axios.put(baseURLUser+`/Proc/${editId}`, data);
        getData();
        clear();
        setSelectedRoleIds([]);
        handleCloseEdit();
        toast.success('User Updated.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        } catch (error) {
            console.error('Error occurred while updating:', error);
            toast.error(error.message || 'An error occurred while updating.');
        }
    };

    const handleDeleteSelected = () => {
        if(showDeleteConfirmation===true){
           selectedIds.forEach(async (id) => {
           try {
               await handleDelete(id);
           } catch (error) {
               console.error(`Error deleting record with ID ${id}:`, error);
           }
           });
           setSelectedIds([]);
           toast.success('Selected User(s) Deleted.', {
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "dark",
               });
          
           console.log("Item deleted");
           setShowDeleteConfirmation(false);
       }
   };

    const handleDelete = (id) =>{
        axios.delete(baseURLUser+`/${id}`)
        .then((result)=>{
            if(result.status===200){
                getData();
            }
        })
        .catch((error)=>{
            toast.error(error);
        })
    }
   

    const handleAdd=()=>{
        handleShowAdd();
    }
    
    const handleConfirmDelete = () => {
        setShowDeleteConfirmation(true);
    };
 
    const handleConfirmDeleteCancel = () => {
        setShowDeleteConfirmation(false);
    };

    const handleCheckboxChange = (id) => {
        const newSelectedIds = selectedIds.includes(id)
          ? selectedIds.filter((selectedId) => selectedId !== id)
          : [...selectedIds, id];
   
        setSelectedIds(newSelectedIds);
    };
    
    const handleCheckboxes = (e) => {
        if (e.target.checked) {
            const newSelectedIds = [];
            data.forEach((record) => {
                newSelectedIds.push(record.id);
            });
            setSelectedIds(newSelectedIds);
        } else {
            setSelectedIds([]);
        }
    }

    const handleRoleCheckboxChange = (e) =>{
        const roleId = e.target.value;
        console.log(roleId);
        const newSelectedIds = selectedRoleIds.includes(roleId)
          ? selectedRoleIds.filter((selectedId) => selectedId !== roleId)
          : [...selectedRoleIds, roleId];
   
        setSelectedRoleIds(newSelectedIds);
    };

    return(
        <div style={{marginTop:"7%"}}>
            <div className="content">
            <div className="heading" style={{marginBottom:"10px"}}>User Record</div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
            <Tooltip title="Add" placement="top" arrow="true">
                <button className="styled-icon" onClick={handleAdd}><AddIcon/></button>
            </Tooltip>
            <Tooltip title="Delete" placement="top" arrow="true">
                <button className="styled-icon" onClick={handleConfirmDelete} disabled={selectedIds.length === 0} ><DeleteIcon/></button>
            </Tooltip>
            </div>

            {showDeleteConfirmation && (
                <ConfirmationPopup
                message="Are you sure you want to delete the record(s)?"
                onConfirm={handleDeleteSelected}
                onCancel={handleConfirmDeleteCancel}
                />
            )}
 
            {showAdd?
                <UserModel
                opAdd={true}
                show={showAdd}
                handleClose={handleCloseAdd}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isLocked={isLocked}
                setIsLocked={setIsLocked}
                securityQuestionId={securityQuestionId}
                setSecurityQuestionId={setSecurityQuestionId}
                answerId={answerId}
                setAnswerId={setAnswerId}
                roleId={roleId}
                setRoleId={setRoleId}
                handleSave={handleSave}
                handleUpdate={handleUpdate}
                isEmailValid={isEmailValid}
                roles={roles}
                selectedRoleIds={selectedRoleIds}
                handleRoleCheckboxChange={handleRoleCheckboxChange}
                />
            :
            (showEdit?
            <UserModel
                opAdd={false}
                show={showEdit}
                handleClose={handleCloseEdit}
                name={editName}
                setName={setEditName}
                email={editEmail}
                setEmail={setEditEmail}
                password={editPassword}
                setPassword={setEditPassword}
                isLocked={editIsLocked}
                setIsLocked={setEditIsLocked}
                securityQuestionId={editSecurityQuestionId}
                setSecurityQuestionId={setEditSecurityQuestionId}
                answerId={editAnswerId}
                setAnswerId={setEditAnswerId}
                roleId={editRoleId}
                setRoleId={setEditRoleId}
                handleSave={handleSave}
                handleUpdate={handleUpdate}
                isEmailValid={isEmailValid}
                roles={roles}
                selectedRoleIds={selectedRoleIds}
                handleRoleCheckboxChange={handleRoleCheckboxChange}
                />
                :
                <div></div>
                )   
            }
            <table class="home">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <input
                                type="checkbox"
                                onChange={(e) => handleCheckboxes(e)}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>IsLocked</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>  
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{width:"10px", textAlign:"center"}}>{index+1}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.password}</td>
                                        <td>{item.isLocked==0? "False": "True"}</td>
                                        <td>{item.roles}</td>
                                        <td>
                                            <Tooltip title="Edit" arrow="true">
                                                <button className="styled-icon" id="editButtonId" onClick={()=>{handleEdit(item.id);}}><EditIcon/></button> &nbsp;
                                            </Tooltip>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            "No records"
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
}
 
export default User;
