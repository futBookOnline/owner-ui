  export const formatDateToNepal = (date) => {
    // Calculate the Nepal timezone offset (5 hours 45 minutes)
    const nepalOffset = 5.75 * 60 * 60 * 1000; // Convert to milliseconds
    
    // Adjust the date for Nepal time zone
    const nepalDate = new Date(date.getTime() + nepalOffset);
  
    // Format the date to YYYY-MM-DD
    const year = nepalDate.getUTCFullYear();
    const month = String(nepalDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(nepalDate.getUTCDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }