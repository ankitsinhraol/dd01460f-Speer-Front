
import React from 'react';


// Global error display component with animation
const GlobalError = ({message}) => {
  return (
    <div style={errorContainerStyles}>
      <div className="error-message">
        <h1>Error Loading Page</h1>
        <p>{message || 'An unexpected error occurred while loading the page.'}</p>
        
      </div>
    </div>
  );
};

// Styles for the error page with animations
const errorContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80%',
  backgroundColor: '#f8d7da',
  color: '#721c24',
  textAlign: 'center',
  fontSize: '1.5rem',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  animation: 'fadeIn 2s ease-out', // Fade in effect for the entire error container
};






export default GlobalError;
