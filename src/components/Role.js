import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURLRole } from '../configurations';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmationPopup from './Confirmation';

import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import RoleModel from "./RoleModel";

const Role = () => {
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(0);
    const [editName, setEditName] = useState('');

    const [data, setData] = useState('');

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () =>setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);


    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(baseURLRole)
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSave = async () => {
        const data = {
            "name": name
        };

        try {
            await axios.post(baseURLRole, data);
            getData();
            clear();
            handleCloseAdd();
            toast.success('Role added.', {
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
            toast.error(error.message || 'An error occurred while saving.');
        }
    };

    const handleEdit = (id) =>{
        handleShowEdit();
        axios.get(baseURLRole+`/${id}`)
        .then((result)=>{
            setEditName(result.data[0].name);
            console.log(result.data[0].name);
            setEditId(id);
        })
        .catch((error)=>{
            toast.error(error);
        })
    }

    const handleUpdate = async () =>{
        const data = {
            "id": editId,
            "name": editName
        }
 
        try {
        await axios.put(baseURLRole+`/${editId}`, data);
        console.log(data);
        getData();
        clear();
        handleCloseEdit();
        toast.success('Role Updated.', {
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


    const clear = () => {
        setName('');
        setEditName('');
    };

    const handleAdd = () => {
        handleShowAdd();
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
           toast.success('Role(s) Deleted.', {
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

    const handleDelete = (id) => {
        axios.delete(baseURLRole + `/${id}`)
            .then((result) => {
                if (result.status === 200) {
                    getData();
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

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
    };

    return (
        <div style={{ marginTop: "7%" }}>
            <div className="heading" style={{ marginBottom: "10px" }}>Role Record</div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <Tooltip title="Add" placement="top" arrow="true">
                    <button className="styled-icon" onClick={handleAdd}><AddIcon /></button>
                </Tooltip>
                
                <Tooltip title="Delete" arrow="true">
                    <button className="styled-icon" onClick={handleConfirmDelete} disabled={selectedIds.length === 0}><DeleteIcon /></button>
                </Tooltip>
            </div>

            {showDeleteConfirmation && (
                <ConfirmationPopup
                message="Are you sure you want to delete the record(s)?"
                onConfirm={handleDeleteSelected}
                onCancel={handleConfirmDeleteCancel}
                />
            )}

            {showAdd ?
                <RoleModel
                    opAdd={true}
                    show={showAdd}
                    handleClose={handleCloseAdd}
                    name={name}
                    setName={setName}
                    handleSave={handleSave}
                    handleUpdate={handleUpdate}
                />
                : 
                showEdit? 
                    <RoleModel
                        opAdd={false}
                        show={showEdit}
                        handleClose={handleCloseEdit }
                        name={editName}
                        setName={setEditName}
                        handleSave={handleSave}
                        handleUpdate={handleUpdate}
                    />
                    :
                    <div></div>
            }

            <table className="home">
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ width: "10px", textAlign: "center" }}>{index + 1}</td>
                                        <td>
                                            <input
                                            type="checkbox"
                                            checked={selectedIds.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id)}
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Tooltip title="Edit" arrow="true">
                                                <button className="styled-icon" id="editButtonId" onClick={()=>{handleEdit(item.id);}}><EditIcon /></button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr><td colSpan="3">No records</td></tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Role;
