import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Create a piece of state to store the current value of the local storage item
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get the stored value from local storage, or use the initial value if it doesn't exist
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If an error occurs, use the initial value
      return initialValue;
    }
  });

  // Return a function that allows the caller to update the value in local storage
  const setValue = value => {
    try {
      // Save the value to local storage
      window.localStorage.setItem(key, JSON.stringify(value));
      // Update the stored value in state
      setStoredValue(value);
    } catch (error) {
      // If an error occurs, log it to the console
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage