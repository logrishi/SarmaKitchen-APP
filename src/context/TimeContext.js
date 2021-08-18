import React, {useState, useEffect, createContext} from 'react';

//context
export const TimeContext = createContext();

//constants
import {base_url} from 'constants/url';
import {
  getConfig,
  handleErrors,
  isLoggedIn,
  showReload,
} from 'constants/handleErrors';

//db
import axios from 'axios';

const TimeContextProvider = (props) => {
  const [currentTime, setCurrentTime] = useState();

  // console.log('newData', newData);
  useEffect(() => {
    getCurrentTime();
  }, []);

  const getCurrentTime = async () => {
    try {
      const res = await axios.get(`${base_url}/getTime`);
      console.log(res.data);
      setCurrentTime(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TimeContext.Provider value={{setCurrentTime, currentTime}}>
      {props.children}
    </TimeContext.Provider>
  );
};

export default TimeContextProvider;
