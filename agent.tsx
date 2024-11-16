import React, { useEffect, useState } from 'react';
import { Agent, TTS, DefaultPrompts } from 'react-agents';

export default function MyAgent() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    // Log the disclaimer only once when the component mounts
    console.log(
      "Disclaimer: I am a virtual assistant providing general medical advice, not a replacement for a doctor. Always consult a healthcare professional for accurate diagnosis and treatment."
    );
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Agent>
      {showDisclaimer}
      <DefaultPrompts />
      <TTS voiceEndpoint="elevenlabs:uni:PSAakCTPE63lB4tP9iNQ" />
    </Agent>
  );
}
