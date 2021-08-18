import 'react-native-gesture-handler';

// context;
import CartContextProvider from 'context/CartContext';
import LocationContextProvider from 'context/LocationContext';
import Navigation from 'navigation/Navigation';
import React from 'react';
import TimeContextProvider from 'context/TimeContext';
// import VegContextProvider from 'context/VegContext';
import UserContextProvider from 'context/UserContext';

const App = () => {
  return (
    // <LocationContextProvider>
    <TimeContextProvider>
      <UserContextProvider>
        <CartContextProvider>
          <Navigation />
        </CartContextProvider>
      </UserContextProvider>
    </TimeContextProvider>
    // </LocationContextProvider>
  );
};

export default App;
