// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAgent } from './hooks'; // Adjust the path based on your file structure

// const MAPBOX_API_KEY = 'pk.eyJ1IjoibGl6aXNpLTAzIiwiYSI6ImNtM2twancwajBldG4ycnM5ZDZzOXNuNTYifQ.FbBkAJ1yYNVQ-n1UzGglHg'; // Your Mapbox API Key


// const EmergencyHandler: React.FC = () => {
//   const {context,respond } = useAgent(); // Access context and respond method using useAgent hook
//   const [hospitalResults, setHospitalResults] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   Function to check for alerting words
//   const containsAlertingWords = (input: string): boolean => {
//     const alertingWords = ['emergency', 'urgent', 'help', 'crisis', 'immediate'];
//     return alertingWords.some(word => input.toLowerCase().includes(word));
//   };

//   Function to fetch nearby hospitals using Mapbox API
//   const fetchNearbyHospitals = async (lat: number, lng: number) => {
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${lng},${lat}&types=poi&access_token=${MAPBOX_API_KEY}`;
//     setLoading(true);

//     try {
//       const response = await axios.get(url);
//       const hospitals = response.data.features || [];
//       setHospitalResults(hospitals);
//       if (hospitals.length > 0) {
//        respond(hospitals.map(hospital => hospital.text).join('\n')); // Respond with hospital names
//       } else {
//        respond('No hospitals found nearby. Please check your location or try again later.');
//       }
//     } catch (error) {
//       console.error('Error fetching hospitals:', error);
//       respond('Sorry, I couldn’t fetch hospital information at the moment.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   Effect to monitor user input in the context
//   useEffect(() => {
//     const userInput = context?.lastInput?.text || ''; // Capture the user's last input
//     if (containsAlertingWords(userInput)) {
//       respond('I detected an emergency. Let me find nearby hospitals for you...');
      
//       Simulated location for testing
//       const simulatedLocation = { lat: 33.7100, lng: 73.0470 };
//       fetchNearbyHospitals(simulatedLocation.lat, simulatedLocation.lng);
//     }
//   }, [context]);

//   return (
//     <>
//       {loading && <p>Fetching hospital information...</p>}
//       {!loading && hospitalResults.length === 0 && <p>No hospitals found.</p>}
//     </>
//   );
// };

// export default EmergencyHandler;
