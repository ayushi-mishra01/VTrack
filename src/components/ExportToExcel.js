import React from 'react';
import axios from 'axios';
import {baseURLStudent} from '../configurations';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
 
const ExportToExcel = () => {
    const exportToExcel = async () => {
        try {
            const response = await axios.get(baseURLStudent+'/ExportToExcel', {
                responseType: 'blob'
            });
 
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'students.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting data to Excel:', error);
        }
    };
 
    return (
<div>
<button onClick={exportToExcel}><FileDownloadIcon/></button>
</div>
    );
};
 
export default ExportToExcel;

