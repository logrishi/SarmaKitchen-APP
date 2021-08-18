import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {apiCall} from 'constants/axiosCalls';
import getPreciseDistance from 'geolib/es/getDistance';

//get locaation permission
export const requestLocationPermission = async (params) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      params.setLocationPermission('granted');
    }
  } catch (err) {
    console.warn(err);
  }
};

//get current location
export const getLocation = (params) => {
  params.setIsLoading(true);
  if (params.locationPermission) {
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log('position', position);
        params.setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        });
        params.setIsLoading(false);
        //   params.setMarkerCoords({
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude,
        //   });
      },
      (error) => {
        // console.log('getCurrentPositionErr', error.code, error.message);
        params.setIsLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  } else {
    params.setIsLoading(false);
    // requestLocationPermission();
  }
};

//get store location
export const getStoreLocationInfo = (params) => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'GET',
      url: 'getLocationInfo',
      data: null,
    },
    (res, err) => {
      if (!err) {
        // console.log('res', res.data);
        params.setBaseCoordinates(res.data.baseCoordinates);
        params.setMaxDistance(res.data.maxDistance);
        params.setIsLoading(false);
      } else {
        params.setIsLoading(false);
        // console.log('err', err);
      }
    },
  );
};

//get distcance
export const checkDelivery = (params) => {
  let distance = getPreciseDistance(params.baseCoordinates, params.userCoords);
  if (distance > params.maxDistance) {
    params.setDeliveryMsg('* Area not deliverable. We are expanding soon...');
  } else {
    params.setDeliveryMsg(null);
  }
};
