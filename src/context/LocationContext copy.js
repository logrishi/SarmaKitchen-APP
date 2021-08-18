import React, {createContext, useEffect, useState} from 'react';

import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
import {base_url} from 'constants/url';
import {errorToast} from 'constants/toasts';
import getPreciseDistance from 'geolib/es/getDistance';

//geo lib for distance calculation - not reqd. for just getting location

//rn geolocation

//rn geocoding

//constants

//db

//context
export const LocationContext = createContext();

const LocationContextProvider = (props) => {
  const [baseCoordinates, setBaseCoordinates] = useState(null);
  const [maxDistance, setMaxDistance] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [coords, setCoords] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [location, setLocation] = useState(null);
  const [deliveryMsg, setDeliveryMsg] = useState(null);
  Geocoder.init('AIzaSyBDEalZVkuc7mP01saLwYpYfQs2kO2m9ks');

  useEffect(() => {
    requestLocationPermission();
    getStoreLocationInfo();
  }, []);

  useEffect(() => {
    getLocation();
  }, [locationPermission]);

  useEffect(() => {
    handleRegionChange();
    checkDelivery();
  }, [userCoords]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationPermission('granted');
      }
    } catch (err) {
      // console.warn(err);
    }
  };

  const getStoreLocationInfo = async () => {
    try {
      const res = await axios.get(`${base_url}/getLocationInfo`);
      setBaseCoordinates(res.data.baseCoordinates);
      setMaxDistance(res.data.maxDistance);
    } catch (e) {
      // errorToast(
      //   'Unable to get Location. Please check locaation settings.',
      //   0.8,
      // );
    }
  };

  const getLocation = () => {
    console.log('getloc called');
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('position', position);
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          });
          setUserCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          });
          // setMarkerCoords({
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          // });
        },
        (error) => {
          console.log('getCurrentPositionErr', error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      requestLocationPermission();
    }
  };
  console.log(coords);
  console.log(userCoords);
  //getChangedLocation
  const handleRegionChange = async () => {
    if (userCoords !== undefined && userCoords !== null) {
      Geocoder.from(userCoords.latitude, userCoords.longitude)
        .then((json) => {
          var addressComponent = json.results[0].formatted_address;
          setLocation(addressComponent);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  };

  //check delivery
  const checkDelivery = () => {
    let delivery = null;
    if (userCoords !== undefined && userCoords !== null) {
      delivery = getDistance(userCoords);
    }
    if (delivery) {
      setDeliveryMsg(null);
    } else {
      setDeliveryMsg('* Area not deliverable. We are expanding soon...');
    }
  };

  //get distcance
  const getDistance = (userCoords, msg, duration) => {
    // if (baseCoords !== undefined && maxDist !== undefined) {
    let distance = getPreciseDistance(baseCoordinates, userCoords);

    if (distance > maxDistance) {
      const msgDefault = 'Area not deliverable. We are expanding soon...';
      if (msg == 'hideToast') {
        return;
      } else {
        // errorToast(msg ? msg : msgDefault, duration ? duration : 0.8);
      }
    } else {
      return true;
    }
    // }
  };

  return (
    <LocationContext.Provider
      value={{
        // getStoreLocationInfo,
        // baseCoordinates,
        // maxDistance,
        getDistance,
        // locationPermission,
        // requestLocationPermission,
        getLocation,
        coords,
        // userCoords,
        setUserCoords,
        location,
        deliveryMsg,
        // handleRegionChange,
        setCoords,
        setLocation,
      }}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
