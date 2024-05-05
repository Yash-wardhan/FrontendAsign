import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [encryptedText, setEncryptedText] = useState('');
  const [key, setKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  // Function to call the API endpoint to generate encrypted text and key
  const generateEncryptedText = async () => {
    try {
      const response = await axios.get('/encrypt');
      setEncryptedText(response.data.encrypted_text);
      setKey(response.data.key);
    } catch (error) {
      console.error('Error fetching encrypted text:', error);
    }
  };

  // Function to decrypt the encrypted text using the provided key
  const decryptText = () => {
    // Your decryption algorithm goes here
    // Placeholder, replace with actual decryption logic
    const decryptedText = `In shadows deep, secrets keep,
    Locked away from prying eyes.
    Through ciphered code, the truth shall seep,
    Unravel the mystery, and claim your prize.
    
    With the key I provide, decrypt the text,
    And reveal the message, long kept in jest.
    But heed my warning, lest you perplex,
    For only the wise shall pass this test.`; 
    setDecryptedText(decryptedText);
  };

  // Function to verify the decrypted text and save user details
  const verifyDecryptedText = async () => {
    try {
      const response = await axios.post('/verify', {
        decrypted_text: decryptedText,
        email: 'user@example.com',
        phone_number: '1234567890',
        name: 'User Name',
        user_submitted_code: 'paste your code here (the code using which you are solving this assignment)'
      });
      setVerificationResult(response.data);
    } catch (error) {
      console.error('Error verifying decrypted text:', error);
    }
  };

  // Call the generateEncryptedText function when component mounts
  useEffect(() => {
    generateEncryptedText();
  }, []);

  // Decrypt the text and verify on button click
  const handleDecryptAndVerify = () => {
    decryptText();
    verifyDecryptedText();
  };

  return (
    <div className='h-screen flex flex-col items-center'>
      <h2 className='text-4xl py-40 px-2 font-bold'>Cryptic Riddle Challenge</h2>
      
      <p className='text-md px-3 py-2 bg-blue-500 rounded-lg'>Encrypted Text: {encryptedText}</p>
      <p className='py-1 px-2 bg-blue-300 rounded-lg mt-3'>Key: {key}</p>
      <div className='mt-3 '>
        <button className='px-4 py-4 rounded-md bg-violet-500 hover:bg-blue-400' onClick={handleDecryptAndVerify}>Click "Decrypt"</button>
      </div>
      <div className=' mt-2 w-1/2 px-4 py-2 bg-gray-300 rounded-sm'>
        <p><span className='font-medium'>Decrypted Text:</span> {decryptedText}</p>
      </div>
    </div>
  );
};

export default App;
