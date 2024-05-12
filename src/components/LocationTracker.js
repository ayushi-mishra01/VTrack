import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {baseURLDriver} from '../configurations';

const LocationTracker = ({id, selectedRole, userName})=>{
//     return(
//         <div className="student-container">
//             <p>
//                 hello {userName}, you have logged-in as {selectedRole}
//             </p>
//         </div>
//     );
// }
 
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);

            sendLocationToBackend(position.coords.latitude, position.coords.longitude);
          },
          error => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();

    const intervalId = setInterval(getLocation, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const sendLocationToBackend = async (latitude, longitude) => {
    try {
      await axios.patch(baseURLDriver+`/${id}/location`, [
        {
          op: 'replace',
          path: '/latitude',
          value: latitude
        },
        {
          op: 'replace',
          path: '/longitude',
          value: longitude
        }
      ]);
      console.log('Location data sent successfully');
    } catch (error) {
      console.error('Error sending location data:', error);
    }
  };
  return (
    <div className="student-container">
      <h1>Location Tracker</h1>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      {/* <MapContainer center={[latitude || 0, longitude || 0]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {latitude && longitude && (
          <Marker position={[latitude, longitude]}>
            <Popup>
              Latitude: {latitude}<br />
              Longitude: {longitude}
            </Popup>
          </Marker>
        )}
      </MapContainer> */}
    </div>
  );
};

export default LocationTracker;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {baseURLDriver} from '../configurations';

// function LocationTracker({id, selectedRole, userName}) {
//   const [busNumbers, setBusNumbers] = useState([]);
//   const [selectedBus, setSelectedBus] = useState('');
//   const [driverLocation, setDriverLocation] = useState(null);

//   useEffect(() => {
//     async function fetchBusNumbers() {
//       try {
//         const response = await axios.get(baseURLDriver);
//         setBusNumbers(response.data);
//       } catch (error) {
//         console.error('Error fetching bus numbers:', error);
//       }
//     }

//     fetchBusNumbers();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (selectedBus) {
//         fetchDriverLocation(selectedBus);
//       }
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [selectedBus]);

//   const fetchDriverLocation = async (busNumber) => {
//     try {
//       const response = await axios.get(baseURLDriver+`/${id}/location`);
//       setDriverLocation(response.data);
//     } catch (error) {
//       console.error('Error fetching driver location:', error);
//       setDriverLocation(null);
//     }
//   };

//   const handleBusChange = async (event) => {
//     const selectedBusNumber = event.target.value;
//     setSelectedBus(selectedBusNumber);
//   };

//   return (
//     <div>
//       <label htmlFor="bus-dropdown">Select a bus:</label>
//       <select id="bus-dropdown" value={selectedBus} onChange={handleBusChange}>
//         <option value="">Select a bus...</option>
//         {busNumbers.map((busNumber, index) => (
//           <option key={index} value={busNumber}>
//             {busNumber}
//           </option>
//         ))}
//       </select>
//       {driverLocation && (
//         <div>
//           <p>Latitude: {driverLocation.latitude}</p>
//           <p>Longitude: {driverLocation.longitude}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LocationTracker;