import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import {baseURLDriver} from '../configurations';

const Student=({selectedRole, userName})=>{
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
        const response = await axios.get(baseURLDriver+`/buslocation/${selectedBusNumber}`);
        setDriverLocation(response.data);
        } catch (error) {
        console.error('Error fetching driver location:', error);
        setDriverLocation(null);
        }
    };

    return(
      <div>
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
          </div>
            {driverLocation && (
                <div>
                <p>Latitude: {driverLocation.latitude}</p>
                <p>Longitude: {driverLocation.longitude}</p>
                <MapContainer center={[driverLocation.latitude, driverLocation.longitude]} zoom={13} style={{ height: "50px", width: "50px" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[driverLocation.latitude, driverLocation.longitude]} />
                </MapContainer>
                </div>
            )}
        </div>
    );
}
 
export default Student;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { baseURLDriver } from '../configurations';

// // const Student = ({ selectedRole, userName }) => {
// //     const [busNumbers, setBusNumbers] = useState([]);
// //     const [selectedBus, setSelectedBus] = useState('');
// //     const [driverLocation, setDriverLocation] = useState(null);
// //     const [map, setMap] = useState(null);

// //     useEffect(() => {
// //         async function fetchBusNumbers() {
// //             try {
// //                 const response = await axios.get('https://localhost:7191/buses');
// //                 setBusNumbers(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching bus numbers:', error);
// //             }
// //         }

// //         fetchBusNumbers();
// //     }, []);

// //     useEffect(() => {
// //         if (driverLocation && map) {
// //             const { latitude, longitude } = driverLocation;
// //             const marker = new window.google.maps.Marker({
// //                 position: { lat: latitude, lng: longitude },
// //                 map: map
// //             });
// //             map.setCenter({ lat: latitude, lng: longitude });
// //         }
// //     }, [driverLocation, map]);

// //     const handleBusChange = async (event) => {
// //         const selectedBusNumber = event.target.value;
// //         setSelectedBus(selectedBusNumber);

// //         try {
// //             const response = await axios.get(baseURLDriver + `/buslocation/${selectedBusNumber}`);
// //             setDriverLocation(response.data);
// //         } catch (error) {
// //             console.error('Error fetching driver location:', error);
// //             setDriverLocation(null);
// //         }
// //     };

// //     const initMap = () => {
// //         const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
// //             zoom: 14,
// //             center: { lat: 25.45084876157831, lng: 81.87818589675167 },
// //         });
// //         setMap(mapInstance);
// //     }

// //     useEffect(() => {
// //         initMap();
// //     }, []);

// //     return (
// //         <div className="student-container">
// //             <label htmlFor="bus-dropdown">Select a bus:</label>
// //             <select id="bus-dropdown" value={selectedBus} onChange={handleBusChange}>
// //                 <option value="">Select a bus...</option>
// //                 {busNumbers.map((busNumber, index) => (
// //                     <option key={index} value={busNumber}>
// //                         {busNumber}
// //                     </option>
// //                 ))}
// //             </select>
// //             <div id="map" style={{ height: "400px", width: "100%" }}></div>
// //         </div>
// //     );
// // }

// // export default Student;


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