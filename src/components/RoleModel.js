import React from 'react';

const RoleModel = ({
    opAdd,
    show,
    handleClose,
    name,
    setName,
    handleSave,
    handleUpdate
}) => {
    return (
        <div className="modal" role="dialog" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">{opAdd ? `Add Role` : `Edit Role: ${name}`}</h4>
                    </div>
                    <div className="modal-body">
                        <table className="custom-table" style={{ width: "500px" }}>
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td colSpan={3}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Role Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button className="styled-button" onClick={opAdd ? handleSave : handleUpdate}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleModel;
