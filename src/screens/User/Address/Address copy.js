import React, {useEffect, useState} from 'react';

import AddAddress from './AddAddress';
import Map from './Map';
import {useNavigation} from '@react-navigation/native';

const Address = ({route, phone}) => {
  let phoneNo = null;
  if (route && route.params) {
    phoneNo = route.params.phone;
  }
  const [userLocation, setUserLocation] = useState();
  const [userCoords, setUserCoords] = useState();
  const [deliveryMsg, setDeliveryMsg] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [baseCoordinates, setBaseCoordinates] = useState();
  const [maxDistance, setMaxDistance] = useState();
  const [locationPermission, setLocationPermission] = useState();
  const [location, setLocation] = useState();
  const [coords, setCoords] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    if (userLocation) {
      navigation.setOptions({headerShown: true});
    } else {
      navigation.setOptions({headerShown: false});
    }
  }, [userLocation]);

  return userLocation ? (
    <AddAddress
      phone={phone ? phone : phoneNo}
      userLocation={userLocation}
      setUserLocation={setUserLocation}
      setUserCoords={setUserCoords}
      userCoords={userCoords}
      setDeliveryMsg={setDeliveryMsg}
      deliveryMsg={deliveryMsg}
    />
  ) : (
    <Map
      setUserLocation={setUserLocation}
      setUserCoords={setUserCoords}
      userCoords={userCoords}
      setDeliveryMsg={setDeliveryMsg}
      deliveryMsg={deliveryMsg}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      setLocationPermission={setLocationPermission}
      locationPermission={locationPermission}
      setBaseCoordinates={setBaseCoordinates}
      baseCoordinates={baseCoordinates}
      setMaxDistance={setMaxDistance}
      maxDistance={maxDistance}
      setLocation={setLocation}
      location={location}
      setCoords={setCoords}
      coords={coords}
    />
  );
};

export default Address;
