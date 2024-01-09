import { useEffect } from 'react';
import { Gyroscope } from 'expo-sensors';


const useGyroscope = (callback) => {
    useEffect(() => {
      let isMounted = true;
  
      
      const handleGyroscopeData = ({ x, y, z }) => {
        if (isMounted) {
          callback({ x, y, z });
        }
      };
      Gyroscope.addListener(handleGyroscopeData);
      Gyroscope.setUpdateInterval(16); // Adjust the update interval as needed (e.g., 16ms for 60 FPS)
  
      return () => {
        isMounted = false;
        Gyroscope.removeAllListeners();
      };
    }, []);
  };

  export default useGyroscope;

