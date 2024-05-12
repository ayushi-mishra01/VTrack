import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import ConfirmationPopup from './Confirmation';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DriverModel from "./DriverModel";
import {baseURLDriver} from "../configurations";

const Driver = ({setManage}) => {
    const [name, setName] = useState('');
    const [busNo, setBusNo] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [longitude, setLongitude] = useState(0.0);
    const [latitude, setLatitude] = useState(0.0);

    const [editId, setEditId] = useState(0);
    const [editName, setEditName] = useState('');
    const [editBusNo, setEditBusNo] = useState('');
    const [editMobile, setEditMobile] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editLongitude, setEditLongitude] = useState(0.0);
    const [editLatitude, setEditLatitude] = useState(0.0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [selectedIds, setSelectedIds] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [data, setData] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(baseURLDriver)
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSave = async (hash) => {
        const data = {
            "name": name,
            "busNo": busNo,
            "mobile": mobile,
            "password": hash,
            "longitude": longitude,
            "latitude": latitude
        };

        try {
            await axios.post(baseURLDriver, data);
            getData();
            clear();
            handleCloseAdd();
            //toast.success('Driver added.');
            toast.success('Driver Added.', {
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
            toast.error('An error occurred while saving.');
        }
    };

    const handleEdit = (id) => {
       handleShowEdit();
        axios.get(baseURLDriver+`/${id}`)
        .then((result)=>{
            setEditName(result.data[0].name);
            setEditBusNo(result.data[0].busNo);
            setEditMobile(result.data[0].mobile);
            setEditPassword(result.data[0].password);
            setEditLongitude(result.data[0].longitude);
            setEditLatitude(result.data[0].latitude);
            setEditId(id);
               
        })
        .catch((error)=>{
            toast.error(error);
        })
    };

    const handleUpdate = async (hash) => {
        const data = {
            "id": editId,
            "name": editName,
            "busNo": editBusNo,
            "mobile": editMobile,
            "password": hash,
            "longitude": editLongitude,
            "latitude": editLatitude
        };

        try {
            await axios.put(baseURLDriver+`/${editId}`, data);
            getData();
            clear();
            handleCloseEdit();
            //toast.success('Driver updated.');
            toast.success('Driver Updated.', {
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
            toast.error('An error occurred while updating.');
        }
    };

    const handleDelete = (id) => {
        axios.delete(baseURLDriver+`/${id}`)
            .then((result) => {
                if (result.status === 200) {
                    getData();
                    //toast.success('Driver deleted.');
                }
            })
            .catch((error) => {
                console.error('Error occurred while deleting:', error);
                toast.error('An error occurred while deleting.');
            });
    };

    const clear = () => {
        setName('');
        setBusNo('');
        setMobile('');
        setPassword('');
        setLongitude(0.0);
        setLatitude(0.0);

        setEditId(0);
        setEditName('');
        setEditBusNo('');
        setEditMobile('');
        setEditPassword('');
        setEditLongitude(0.0);
        setEditLatitude(0.0);
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
           toast.success('Selected Driver(s) Deleted.', {
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

    return(
        <div style={{marginTop:"7%"}}>
            <div className="content">
            <div className="heading" style={{marginBottom:"10px"}}>Driver Record</div>
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
                <DriverModel
                opAdd={true}
                show={showAdd}
                handleClose={handleCloseAdd}
                name={name}
                setName={setName}
                busNo={busNo}
                setBusNo={setBusNo}
                mobile={mobile}
                setMobile={setMobile}
                password={password}
                setPassword={setPassword}
                longitude={longitude}
                setLongitude={setLongitude}
                latitude={latitude}
                setLatitude={setLatitude}
                handleSave={handleSave}
                handleUpdate={handleUpdate}
                clear={clear}
                />
            :
            (showEdit?
            <DriverModel
                opAdd={false}
                show={showEdit}
                handleClose={handleCloseEdit}
                name={editName}
                setName={setEditName}
                busNo={editBusNo}
                setBusNo={setEditBusNo}
                mobile={editMobile}
                setMobile={setEditMobile}
                password={editPassword}
                setPassword={setEditPassword}
                longitude={longitude}
                setLongitude={setEditLongitude}
                latitude={latitude}
                setLatitude={setEditLatitude}
                handleSave={handleSave}
                handleUpdate={handleUpdate}
                clear={clear}
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
                        <th>Bus Number</th>
                        <th>Mobile</th>
                        <th>Password</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
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
                                        <td>{item.busNo}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.password}</td>
                                        <td>{item.longitude}</td>
                                        <td>{item.latitude}</td>
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
 
export default Driver;
