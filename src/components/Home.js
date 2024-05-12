import React, {useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {validateData} from './Validate';
import {baseURL, baseURLStudent} from '../configurations';
import CustomModal from './Modal';
import ConfirmationPopup from './Confirmation';
import ExportToExcel from './ExportToExcel';
 
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import SearchIcon from '@mui/icons-material/Search';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import SouthIcon from '@mui/icons-material/South';
 
const Home = ({ userName, selectedRole})=> {
 
    //for add model
    const [add, setAdd] = useState(false);
    const handleCloseAdd = () => setAdd(false);
    const handleShowAdd = () => setAdd(true);
 
    //for edit model
    const [edit, setEdit] = useState(false);
    const handleCloseEdit = () =>setEdit(false);
    const handleShowEdit = () => setEdit(true);
 
    //add fields
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [stateId, setStateId] = useState(0);
    const [cityId, setCityId] = useState(0);
    const [gender, setGender] = useState(2);
    const [maritalStatus, setMaritalStatus] = useState(4);
    const [isActive, setIsActive] = useState(0);
    const [createdBy, setCreatedBy] = useState(0);
    const [createdOn, setCreatedOn] = useState('');
    const [modifiedBy, setModifiedBy] = useState(0);
    const [modifiedOn, setModifiedOn] = useState('');
 
 
    //edited fields
    const [editId, editSetId] = useState('');
    const [editCode, editSetCode] = useState('');
    const [editName, editSetName] = useState('');
    const [editEmail, editSetEmail] = useState('');
    const [editMobile, editSetMobile] = useState('');
    const [editAddress1, editSetAddress1] = useState('');
    const [editAddress2, editSetAddress2] = useState('');
    const [editStateId, editSetStateId] = useState(0);
    const [editCityId, editSetCityId] = useState(0);
    const [editGender, editSetGender] = useState(2);
    const [editMaritalStatus, editSetMaritalStatus] = useState(4);
    const [editIsActive, editSetIsActive] = useState(0);
    const [editCreatedBy, editSetCreatedBy] = useState(0);
    const [editCreatedOn, editSetCreatedOn] = useState('');
    const [editModifiedBy, editSetModifiedBy] = useState(0);
    const [editModifiedOn, editSetModifiedOn] = useState('');
   
    //for state and city dropdown display
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
 
    //for student record
    const [data, setData] = useState([]);
    const [sortAttribute, setSortAttribute] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [searchName, setSearchName] = useState('');
 
    //selected ids for validation
    const [selectedIds, setSelectedIds] = useState([]);
 
    //to check if edited email/mobile is different from orginial one or not
    const [emailOfEditStudent, setEmailOfEditStudent]=useState('');
    const [mobileOfEditStudent, setMobileOfEditStudent]=useState('');
 
    //delete confirmation pop-up
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
 
     //deactivate confirmation pop-up
     const [showDeactivateConfirmation, setShowDeactivateConfirmation] = useState(false);
 
    //get current date
    const currentDate = new Date().toISOString();
 
    useEffect(()=>{
        getData();
 
        axios.get(baseURL+'/State')
        .then((result) => {
            setStates(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [pageNumber, pageSize, sortAttribute, sortOrder]);
 
    const getData = () => {
        const paginationParams = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortAttribute: sortAttribute,
            sortOrder: sortOrder,
            searchName: searchName
        };
   
        axios.post(baseURLStudent + '/PaginatedSort', paginationParams,{
            headers:{
                'Api_Key':'ABCDE12345'
            }
        }).then((result) => {
                setData(result.data.data);
                setTotalPages(result.data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            });
    };
 
    const handleSort = (attribute) => {
        if (sortAttribute === attribute) {
            setSortOrder(sortOrder===''? 'asc' : (sortOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortAttribute(attribute);
            setSortOrder('asc');
        }
    };
 
    const startIndex = (pageNumber - 1) * pageSize + 1;
 
    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }
 
    const handleNextPage = () => {
        if (pageNumber < totalPages) {
            setPageNumber(pageNumber + 1);
        }
    }
 
    const handlePageSizeChange = (event) => {
        const newSize = parseInt(event.target.value);
        setPageSize(newSize);
    }
 
    const renderPageSizeOptions = () => {
        const options = [];
        for (let size = 5; size <= 100; size += 5) {
            options.push(<option key={size} value={size}>{size} per page</option>);
        }
        return options;
    }
 
    const checkEmail = async (emailPara) => {
        try {
          const response = await axios.get(baseURLStudent+`/CheckEmail/${emailPara}`);
          return response.data.exists;
        } catch (error) {
          console.error('Error checking email:', error);
        }
      };
     
      const checkMobile = async (mobilePara) => {
        try {
          const response = await axios.get(baseURLStudent+`/CheckMobile/${mobilePara}`);
          return response.data.exists;
        } catch (error) {
          console.error('Error checking mobile number:', error);
        }
      };
 
      const isNameValid=(name)=>{
        const nameRegex=/^[A-Z][a-zA-z\s]*$/;
        if (!nameRegex.test(name)) {
            document.getElementById("nameV").innerHTML ="Enter name*";
        }
        else{
            document.getElementById("nameV").innerHTML ="";
        }
      }
 
      const isEmailValid=(email)=>{
        const emailRegex=/^[a-zA-Z0-9_]+[@][a-z]+[.][a-z]{2,3}$/;
        if (!emailRegex.test(email)) {
            document.getElementById("emailV").innerHTML ="Enter valid email*";
        }
        else{
            document.getElementById("emailV").innerHTML ="";
        }
      }
 
      const isMobileValid=(mobile)=>{
        const mobileRegex=/^[6-9][0-9]{9}$/;
        if (!mobileRegex.test(mobile)) {
            document.getElementById("mobileV").innerHTML ="Enter valid number*";
        }
        else{
            document.getElementById("mobileV").innerHTML ="";
        }
      }
 
    const handleSave = async () =>{
        const data = {
            "code": code,
            "name": name,
            "email": email,
            "mobile": mobile,
            "address1": address1,
            "address2": address2,
            "isActive": isActive,
            "stateId": stateId,
            "cityId": cityId,
            "gender": gender,
            "maritalStatus": maritalStatus,
            "createdBy": createdBy,
            "createdOn": currentDate,
            "modifiedBy": modifiedBy,
            "modifiedOn": currentDate
        }
 
        const validationError = validateData(data);
        if (validationError) {
            document.getElementById("validation").innerHTML = validationError;
            return;
        }
     
        try {
            const emailExists = await checkEmail(email);
            if (emailExists) {
                document.getElementById("validation").innerHTML ="Email already exists.";
                return;
            }
 
            const mobileExists = await checkMobile(mobile);
            if (mobileExists) {
                document.getElementById("validation").innerHTML ="Mobile number already exists.";
                return;
            }
 
            await axios.post(baseURLStudent, data,{
                headers:{
                    'Api_Key':'ABCDE12345'
                }
            });
            getData();
            clear();
            handleCloseAdd();
            setCities([]);
            //toast emitter
            toast.success('Student added.', {
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
 
    //clear the fields present in model
    const clear = () =>{
        setCode('');
        setName('');
        setEmail('');
        setMobile('');
        setAddress1('');
        setAddress2('');
        setIsActive(0);
        setGender(2);
        setMaritalStatus(4);
        setStateId(0);
        setCityId(0);
        setCreatedBy(0);
        setCreatedOn('');
        setModifiedBy(0);
        setModifiedOn('');
 
        editSetCode('');
        editSetName('');
        editSetEmail('');
        editSetMobile('');
        editSetAddress1('');
        editSetAddress2('');
        editSetIsActive(0);
        editSetGender(2);
        editSetMaritalStatus(4);
        editSetStateId(0);
        editSetCityId(0);
        editSetCreatedBy(0);
        editSetCreatedOn('');
        editSetModifiedBy(0);
        editSetModifiedOn('');
        editSetId('');
 
        setEmailOfEditStudent('');
        setMobileOfEditStudent('');
 
    }
 
    //open add model when add button clicked
    const handleAdd = ()=>{
        handleShowAdd();
    }
 
    const handleEdit = (id) =>{
        handleShowEdit();
        axios.get(baseURLStudent+`/${id}`)
        .then((result)=>{
            editSetCode(result.data[0].code);
            editSetName(result.data[0].name);
            editSetEmail(result.data[0].email);
            editSetMobile(result.data[0].mobile);
            editSetAddress1(result.data[0].address1);
            editSetAddress2(result.data[0].address2);
            editSetIsActive(result.data[0].isActive);
            editSetGender(result.data[0].gender);
            editSetMaritalStatus(result.data[0].maritalStatus);
            editSetStateId(result.data[0].stateId);
            editSetCityId(result.data[0].cityId);
            editSetCreatedBy(result.data[0].createdBy);
            editSetCreatedOn(result.data[0].createdOn);
            editSetModifiedBy(result.data[0].modifiedBy);
            editSetModifiedOn(result.data[0].modifiedOn);
            editSetId(id);
 
            setEmailOfEditStudent(result.data[0].email);
            setMobileOfEditStudent(result.data[0].mobile);
               
        })
        .catch((error)=>{
            toast.error(error);
        })
    }
 
    const handleUpdate = async () =>{
        const data = {
            "code": editCode,
            "name": editName,
            "email": editEmail,
            "mobile": editMobile,
            "address1": editAddress1,
            "address2": editAddress2,
            "isActive": editIsActive,
            "gender": editGender,
            "maritalStatus": editMaritalStatus,
            "stateId": editStateId,
            "cityId": editCityId,
            "createdBy": editCreatedBy,
            "createdOn": editCreatedOn,
            "modifiedBy": editModifiedBy,
            "modifiedOn": currentDate
        }
 
        const validationError = validateData(data);
        if (validationError) {
            document.getElementById("validation").innerHTML = validationError;
            return;
        }
 
        try {
        const eEmailExists= await checkEmail(editEmail);
        if (emailOfEditStudent!==editEmail && eEmailExists) {
            document.getElementById("validation").innerHTML = "Email already exists."
            return;
        }
 
        const eMobileExists= await checkMobile(editMobile);
        if (mobileOfEditStudent!==editMobile && eMobileExists) {
            document.getElementById("validation").innerHTML = "Mobile already exists."
            return;
        }
 
            await axios.put(baseURLStudent+`/${editId}`, data,{
                headers:{
                    'Api_Key':'ABCDE12345'
                }
            });
            getData();
            clear();
            handleCloseEdit();
            setCities([]);
            toast.success('Student Updated.', {
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
 
    //Deletion Process
    const handleConfirmDelete = () => {
        setShowDeleteConfirmation(true);
    };
 
    const handleConfirmDeleteCancel = () => {
        setShowDeleteConfirmation(false);
    };
 
    const handleDeleteSelected = () => {
         if(showDeleteConfirmation===true){
            selectedIds.forEach(async (id) => {
            try {
                await  handleDelete(id);
            } catch (error) {
                console.error(`Error deleting record with ID ${id}:`, error);
            }
            });
            setSelectedIds([]);
            toast.success('Selected Student(s) Deleted.', {
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
        axios.delete(baseURLStudent+`/${id}`)
        .then((result)=>{
            if(result.status===200){
                getData();
            }
        })
        .catch((error)=>{
            toast.error(error);
        })
    }
   
    //Deactivation process
    const handleConfirmDeactivate = () => {
        setShowDeactivateConfirmation(true);
    };
 
    const handleConfirmDeactivateCancel = () => {
        setShowDeactivateConfirmation(false);
    };
 
    const handleSelectedDeactive = () => {
         if(showDeactivateConfirmation===true){
            selectedIds.forEach(async (id) => {
            try {
                await  handleDeactivate(id);
            } catch (error) {
                console.error(`Error deleting record with ID ${id}:`, error);
            }
            });
            setSelectedIds([]);
            toast.success('Selected Deactivated.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            console.log("Item deactivated");
            setShowDeactivateConfirmation(false);
        }
    };
 
    const handleDeactivate = (id) =>{
        axios.patch(baseURLStudent+`/${id}`, [{"op": "replace","path": "/isActive","value": 0}])  //patch method takes values op,path,value
        .then((result)=>{
            if(result.status===200){
                getData();
            }
        })
        .catch((error)=>{
            toast.error(error);
        })
    }
 
    //when a record is selected
    const handleCheckboxChange = (id) => {
        const newSelectedIds = selectedIds.includes(id)
          ? selectedIds.filter((selectedId) => selectedId !== id)
          : [...selectedIds, id];
   
        setSelectedIds(newSelectedIds);
    };
 
    const handleActiveChange=(e)=>{
        if(e.target.checked){
            setIsActive(1);
        }
        else{
            setIsActive(0);
        }
    }
 
    const handleEditActiveChange=(e)=>{
        if(e.target.checked){
            editSetIsActive(1);
        }
        else{
            editSetIsActive(0);
        }
    }
 
     const handleStateChange = (stateId) => {
        axios.get(baseURL+`/City/FromState/${stateId}`)
            .then((result) => {
                setCities(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
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
 
    const stateOptions = states.map((state) => (
        <option value={state.id}>{state.name}</option>
    ));
 
    const cityOptions = cities.map((city) => (
        <option value={city.id}>{city.name}</option>
    ));
 
    // const sortBy=(attribute)=>{
    //     const paginationSortParams = {
    //         pageNumber: 1,
    //         pageSize: pageSize,
    //         sortAttribute: sortAttribute
    //     };
   
    //     axios.post(baseURLStudent + '/PaginatedSort', paginationSortParams)
    //         .then((result) => {
    //             setData(result.data.data);
    //             setTotalPages(result.data.totalPages);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
 
    const handleSearch = () => {
        setPageNumber(1);
        getData();
     };
 
    return(
        <div>
            <div className="content">
            <div className="heading">Welcome {userName}, you have logged-in as {selectedRole}</div>
            <div className="heading">Student Record</div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
            <Tooltip title="Add" placement="top" arrow="true">
                <button className="styled-icon" onClick={handleAdd}><AddIcon/></button>
            </Tooltip>
            <Tooltip title="Delete" placement="top" arrow="true">
                <button className="styled-icon" onClick={handleConfirmDelete} disabled={selectedIds.length === 0}><DeleteIcon/></button>
            </Tooltip>
            <Tooltip title="Deactivate" placement="top" arrow="true">
                <button className="styled-icon" onClick={handleConfirmDeactivate} disabled={selectedIds.length === 0}><ClearIcon/></button>
            </Tooltip>
 
            <div style={{ display: "flex", alignItems: "center", marginLeft: "55%"}}>
                <div style={{marginRight:'10px'}}>
                <ExportToExcel/>
                </div>
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        marginRight: "5px",
                        width: "200px"
                    }}
                />
                <Tooltip title="Search" arrow={true}>
                    <button className="styled-icon-paging" onClick={handleSearch}>
                        <SearchIcon style={{ fontSize: "20px" }} />
                    </button>
                </Tooltip>
 
                <select
                    style={{
                        marginLeft: "10px",
                        height: "30px",
                        padding: "4px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        margin: "10px"
                    }}
                    value={pageSize}
                    onChange={handlePageSizeChange}
                >
                    {renderPageSizeOptions()}
                </select>
            </div>
            </div>
 
            {showDeleteConfirmation && (
                <ConfirmationPopup
                message="Are you sure you want to delete the record(s)?"
                onConfirm={handleDeleteSelected}
                onCancel={handleConfirmDeleteCancel}
                />
            )}
           
            {showDeactivateConfirmation && (
                <ConfirmationPopup
                message="Are you sure you want to deactivate the record(s)?"
                onConfirm={handleSelectedDeactive}
                onCancel={handleConfirmDeactivateCancel}
                />
            )}
 
            <ToastContainer/>
           
            {/*model*/}
            {add?
            <CustomModal
                opAdd={true}
                show={add}
                handleClose={handleCloseAdd}
                code={code}
                email={email}
                setEmail={setEmail}
                address1={address1}
                setAddress1={setAddress1}
                address2={address2}
                setAddress2={setAddress2}
                name={name}
                setName={setName}
                mobile={mobile}
                setMobile={setMobile}
                maritalStatus={maritalStatus}
                setMaritalStatus={setMaritalStatus}
                stateId={stateId}
                setStateId={setStateId}
                handleStateChange={handleStateChange}
                gender={gender}
                setGender={setGender}
                cityId={cityId}
                setCityId={setCityId}
                stateOptions={stateOptions}
                cityOptions={cityOptions}
                isActive={isActive}
                setIsActive={setIsActive}
                handleActiveChange={handleActiveChange}
                handleSave={handleSave}
                handleUpdate={handleUpdate}
                isEmailValid={isEmailValid}
                isNameValid={isNameValid}
                isMobileValid={isMobileValid}
                clear={clear}
            />
            :
                (edit?
                <CustomModal
                    opAdd={false}
                    show={edit}
                    handleClose={handleCloseEdit}
                    code={editCode}
                    email={editEmail}
                    setEmail={editSetEmail}
                    address1={editAddress1}
                    setAddress1={editSetAddress1}
                    address2={editAddress2}
                    setAddress2={editSetAddress2}
                    name={editName}
                    setName={editSetName}
                    mobile={editMobile}
                    setMobile={editSetMobile}
                    maritalStatus={editMaritalStatus}
                    setMaritalStatus={editSetMaritalStatus}
                    stateId={editStateId}
                    setStateId={editSetStateId}
                    handleStateChange={handleStateChange}
                    gender={editGender}
                    setGender={editSetGender}
                    cityId={editCityId}
                    setCityId={editSetCityId}
                    stateOptions={stateOptions}
                    cityOptions={cityOptions}
                    isActive={editIsActive}
                    setIsActive={editSetIsActive}
                    handleActiveChange={handleEditActiveChange}
                    handleSave={handleSave}
                    handleUpdate={handleUpdate}
                    isEmailValid={isEmailValid}
                    isNameValid={isNameValid}
                    isMobileValid={isMobileValid}
                    clear={clear}
                />
                :
                <div></div>
                )
            }
            <table class="home" >
                <thead>
                    <tr>
                        <th style={{ width: "10px", textAlign: "center" }}>#</th>
                        <th><input
                                type="checkbox"
                                onChange={(e) => handleCheckboxes(e)}
                            />
                        </th>
                        <th
                            onClick={() => handleSort('code')}>
                            {sortAttribute !== 'code' ? <SwapVertRoundedIcon/> : (sortOrder === 'asc' ? <NorthRoundedIcon/> : <SouthIcon/>)}
                            Code
                        </th>
                        <th
                            onClick={() => handleSort('name')}>
                            {sortAttribute !== 'name' ? <SwapVertRoundedIcon/> : (sortOrder === 'asc' ? <NorthRoundedIcon/> : <SouthIcon/>)}
                            Name
                        </th>
                        <th
                            onClick={() => handleSort('email')}>
                            {sortAttribute !== 'email' ? <SwapVertRoundedIcon/> : (sortOrder === 'asc' ? <NorthRoundedIcon/> : <SouthIcon/>)}
                            Email
                        </th>
                        <th> Mobile</th>
                        <th
                            onClick={() => handleSort('address1')}>
                            {sortAttribute !== 'address1' ? <SwapVertRoundedIcon/> : (sortOrder === 'asc' ? <NorthRoundedIcon/> : <SouthIcon/>)}
                            Address1
                        </th>
                        <th
                            onClick={() => handleSort('address2')}>
                            {sortAttribute !== 'address2' ? <SwapVertRoundedIcon/> : (sortOrder === 'asc' ? <NorthRoundedIcon/> : <SouthIcon/>)}
                            Address2
                        </th>
                        <th
                            onClick={() => handleSort('statename')}>
                            {sortAttribute !== 'statename' ? <SwapVertRoundedIcon/> : (sortOrder === 'asc' ? <NorthRoundedIcon/> : <SouthIcon/>)}
                            State
                        </th>
                        <th
                            onClick={() => handleSort('cityname')}>
                            {sortAttribute !== 'cityname' ? <SwapVertRoundedIcon/> : (sortOrder === 'asc' ? <NorthRoundedIcon/> : <SouthIcon/>)}
                            City
                        </th>
                        <th> Gender </th>
                        <th> Marital Status </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data && data.length > 0 ?
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{width:"10px", textAlign:"center"}}>{startIndex+index}</td>
                                    <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />
                                    </td>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.address1}</td>
                                    <td>{item.address2}</td>
                                    <td>{item.stateName}</td>
                                    <td>{item.cityName}</td>
                                    <td>{item.gender === 0 ? "Male" : "Female"}</td>
                                    <td>{item.maritalStatus === 0 ? "Single" : (item.maritalStatus === 1 ? "Married" : "Separated")}</td>
                                    <td>
                                        <Tooltip title="Edit" arrow="true">
                                            <button className="styled-icon" id="editButtonId" onClick={()=>{handleStateChange(item.stateId); handleEdit(item.id);}}><EditIcon/></button> &nbsp;
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Tooltip title="Previous"  arrow="true">
                    <button className="styled-icon-paging" onClick={handlePreviousPage} disabled={pageNumber === 1}><ArrowBackIosNewSharpIcon/></button>
                </Tooltip>
                <span className="paging-span">Page {pageNumber} of {totalPages}</span>
                <Tooltip title="Next" arrow="true">
                    <button className="styled-icon-paging" onClick={handleNextPage} disabled={pageNumber === totalPages || totalPages===0 }><ArrowForwardIosSharpIcon/></button>
                </Tooltip>
                </div>
            </div>
    </div>
    )
}
 
export default Home;
 