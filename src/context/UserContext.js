import React, {createContext, useEffect, useState} from 'react';

import {getData} from 'apiCalls/AsyncStorage';
import {source} from 'constants/axiosCalls';

//context
export const UserContext = createContext();
const UserContextProvider = (props) => {
  const [storedUserData, setStoredUserData] = useState();

  useEffect(() => {
    getData(
      'userDetails',
      (userDetails) => {
        if (userDetails !== null) {
          userDetails = JSON.parse(userDetails);
          setStoredUserData(userDetails);
        } else {
          setStoredUserData();
        }
      },
      (e) => {},
    );
    return () => source.cancel('Operation canceled by the user.');
  }, []);

  return (
    <UserContext.Provider
      value={{
        setStoredUserData,
        storedUserData,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
