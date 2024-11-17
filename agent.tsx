import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Agent, TTS, DefaultPrompts } from 'react-agents';

const MAPBOX_API_KEY = 'pk.eyJ1IjoibGl6aXNpLTAzIiwiYSI6ImNtM2twancwajBldG4ycnM5ZDZzOXNuNTYifQ.FbBkAJ1yYNVQ-n1UzGglHg'; // Your Mapbox API Key

export default function MyAgent() {
  const [hospitalResults, setHospitalResults] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(true); // Default disclaimer
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Log the disclaimer only once 
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
    // Using simulated location (since geolocation is not supported in terminal)
    const simulatedLocation = { lat: 33.7100, lng: 73.0470 }; // Islamabad
    setUserLocation(simulatedLocation);
    getNearbyHospitals(simulatedLocation); // Fetch hospitals once location is obtained
  };

  // Triggered when user needs immediate medical attention
  const handleEmergency = () => {
    console.log("Fetching the nearest hospitals near you for reference...");
    
    // Get user's location (simulated for testing purposes)
    getUserLocation();
  };

  // Example of how you can detect a need for immediate help
  const checkForEmergency = (input: string) => {
    const emergencyKeywords = ["emergency", "urgent", "help", "immediate", "emergency help"];
    return emergencyKeywords.some(keyword => input.toLowerCase().includes(keyword));
  };

  useEffect(() => {
    const userInput = "urgent help"; // Simulate user input (replace this with actual user input)
    
    if (checkForEmergency(userInput)) {
      handleEmergency(); // If emergency detected, trigger hospital locator
    }
  }, []);

  
  // Print hospital results to terminal
  useEffect(() => {
    if (hospitalResults.length > 0) {
      hospitalResults.forEach((hospital) => {
        console.log(`- ${hospital.text}`);
        console.log(`  Address: ${hospital.properties?.address || 'No address available'}`);
        // Phone number handling would require more specific data, which Mapbox Geocoding API may not provide
      });
    }
  }, [hospitalResults]);


  return (
    <Agent>
      
      <DefaultPrompts />
      {/* <TTS voiceEndpoint="elevenlabs:uni:PSAakCTPE63lB4tP9iNQ" /> */}
      
    </Agent>
  );

}

