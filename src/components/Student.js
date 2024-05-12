import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURLDriver } from '../configurations';
import GoogleMap from './GoogleMap'; // Import GoogleMap component

const Student = ({ selectedRole, userName }) => {
    const [busNumbers, setBusNumbers] = useState([]);
    const [selectedBus, setSelectedBus] = useState('');
    const [driverLocation, setDriverLocation] = useState(null);

    useEffect(() => {
        async function fetchBusNumbers() {
            try {
                const response = await axios.get('https://localhost:7191/buses');
                setBusNumbers(response.data);
            } catch (error) {
                console.error('Error fetching bus numbers:', error);
            }
        }

        fetchBusNumbers();
    }, []);

    const handleBusChange = async (event) => {
        const selectedBusNumber = event.target.value;
        setSelectedBus(selectedBusNumber);

        try {
            const response = await axios.get(baseURLDriver + `/buslocation/${selectedBusNumber}`);
            setDriverLocation(response.data);
        } catch (error) {
            console.error('Error fetching driver location:', error);
            setDriverLocation(null);
        }
    };

    return (
        <div className="student-container">
            <label htmlFor="bus-dropdown">Select a bus:</label>
            <select id="bus-dropdown" value={selectedBus} onChange={handleBusChange}>
                <option value="">Select a bus...</option>
                {busNumbers.map((busNumber, index) => (
                    <option key={index} value={busNumber}>
                        {busNumber}
                    </option>
                ))}
            </select>
            {driverLocation && (
                <div>
                    <p>Latitude: {driverLocation.latitude}</p>
                    <p>Longitude: {driverLocation.longitude}</p>
                    {/* Pass latitude and longitude to GoogleMap component */}
                    <GoogleMap lat={driverLocation.latitude} lon={driverLocation.longitude} />
                </div>
            )}
        </div>
    );
}

export default Student;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {baseURLDriver} from '../configurations';

// const Student=({selectedRole, userName})=>{
//     const [busNumbers, setBusNumbers] = useState([]);
//     const [selectedBus, setSelectedBus] = useState('');
//     const [driverLocation, setDriverLocation] = useState(null);

//     useEffect(() => {
//         async function fetchBusNumbers() {
//         try {
//             const response = await axios.get('https://localhost:7191/buses');
//             setBusNumbers(response.data);
//         } catch (error) {
//             console.error('Error fetching bus numbers:', error);
//         }
//         }

//         fetchBusNumbers();
//     }, []);

//     const handleBusChange = async (event) => {
//         const selectedBusNumber = event.target.value;
//         setSelectedBus(selectedBusNumber);
        
//         try {
//         const response = await axios.get(baseURLDriver+`/buslocation/${selectedBusNumber}`);
//         setDriverLocation(response.data);
//         } catch (error) {
//         console.error('Error fetching driver location:', error);
//         setDriverLocation(null);
//         }
//     };
//     return(
//         <div className="student-container">
//             <label htmlFor="bus-dropdown">Select a bus:</label>
//             <select id="bus-dropdown" value={selectedBus} onChange={handleBusChange}>
//                 <option value="">Select a bus...</option>
//                 {busNumbers.map((busNumber, index) => (
//                 <option key={index} value={busNumber}>
//                     {busNumber}
//                 </option>
//                 ))}
//             </select>
//             {driverLocation && (
//                 <div>
//                 <p>Latitude: {driverLocation.latitude}</p>
//                 <p>Longitude: {driverLocation.longitude}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
 
// export default Student;