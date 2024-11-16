import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MAPBOX_API_KEY = 'pk.eyJ1IjoibGl6aXNpLTAzIiwiYSI6ImNtM2twancwajBldG4ycnM5ZDZzOXNuNTYifQ.FbBkAJ1yYNVQ-n1UzGglHg'; // Your Mapbox API Key

export default function MyAgent() {
  const [hospitalResults, setHospitalResults] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(true); // Default disclaimer
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Log the disclaimer only once when the component mounts
    console.log(
      "Disclaimer: I am a virtual assistant providing general medical advice, not a replacement for a doctor. Always consult a healthcare professional for accurate diagnosis and treatment."
    );
  }, []); 

  // Function to get nearby hospitals using Mapbox Geocoding API
  const getNearbyHospitals = async (location: { lat: number; lng: number }) => {
    setLoading(true);
    const { lat, lng } = location;
    const radius = 5000; // 5 km radius
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${lng},${lat}&types=poi&access_token=${MAPBOX_API_KEY}`;
    
    try {
      const response = await axios.get(url);
      const places = response.data.features;
      
      if (places.length > 0) {
        setHospitalResults(places);
      } else {
        setHospitalResults([{ text: 'No hospitals found nearby. Please try again later.' }]);
      }
    } catch (error) {
      console.error('Error fetching hospital data:', error);
      setHospitalResults([{ text: 'There was an error fetching hospital information.' }]);
    }
    setLoading(false);
  };

  // Function to get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          getNearbyHospitals(location); // Fetch hospitals once location is obtained
        },
        (error) => {
          console.error("Error getting location:", error);
          setHospitalResults([{ text: 'Location access denied. Please enable location services.' }]);
          setLoading(false);
        }
      );
    } else {
      setHospitalResults([{ text: 'Geolocation is not supported by this browser.' }]);
      setLoading(false);
    }
  };

  // Run the location detection on component mount
  useEffect(() => {
    // Simulate location for testing
    const simulatedLocation = { lat: 40.7128, lng: -74.0060 }; // Example: New York City coordinates
    setUserLocation(simulatedLocation);
    getNearbyHospitals(simulatedLocation);
  }, []);

  // Print hospital results to terminal
  useEffect(() => {
    if (hospitalResults.length > 0) {
      console.log("Nearby Hospitals:");
      hospitalResults.forEach((hospital) => {
        console.log(`- ${hospital.text}`);
        console.log(`  Address: ${hospital.properties?.address || 'No address available'}`);
      });
    }
  }, [hospitalResults]);

  // Print loading message
  if (loading) {
    console.log("Loading nearby hospitals...");
  }

  return null; // Since we're not rendering anything to the web UI
}

