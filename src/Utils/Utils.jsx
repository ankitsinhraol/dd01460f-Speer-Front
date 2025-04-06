import { updateCall } from "./Api";

export const convertToTimeFormat = (dateString) => {
    const date = new Date(dateString);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleTimeString([], options);
  };


 export const convertSecondsToHHMMSS = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    // Format time as HH:MM:SS
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };


  export const updateMultipleCalls = async (calls) => {
    try {
        // Map through the array of calls and create an array of promises
        const updatePromises = calls.map(call => 
            updateCall(call.id, true) // Assuming each call has id and is_archived properties
        );

        // Wait for all updates to complete
        const results = await Promise.all(updatePromises);
        
        // Return the results if needed
        return results;
    } catch (error) {
        console.log("Error updating calls:", error);
        throw error; // Re-throw the error if you want to handle it upstream
    }
};

  