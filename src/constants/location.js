import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {apiCall} from 'constants/axiosCalls';
import getPreciseDistance from 'geolib/es/getDistance';

//get locaation permission
export const requestLocationPermission = async (params) => {
  let granted;
  try {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return granted;
    }
  } catch (err) {
    return granted;
    // console.warn(err);
  }
};

//get current location
export const getLocation = (callback) => {
  // if (perm == 'granted') {
  Geolocation.getCurrentPosition(
    (position) => {
      // console.log('position', position);
      callback(position);
    },
    (error) => {
      // console.log('getCurrentPositionErr', error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
  // }
  //  else {
  //   // requestLocationPermission();
  // }
  return 'currentPosition';
};

// get address from coords
export const getAddressFromCoords = async (region, callback) => {
  Geocoder.init('AIzaSyBDEalZVkuc7mP01saLwYpYfQs2kO2m9ks');
  Geocoder.from(region.latitude, region.longitude)
    .then((json) => {
      var addressComponent = json.results[0].formatted_address;
      callback(addressComponent);
    })
    .catch((error) => console.warn(error));
};

//get store location
export const getStoreLocationInfo = (params, callback) => {
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
        callback({
          baseCoordinates: res.data.baseCoordinates,
          maxDistance: res.data.maxDistance,
        });
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
  let delivery;
  let distance = getPreciseDistance(params.baseCoordinates, params.coords);
  if (distance > params.maxDistance) {
    // params.setDeliveryMsg('* Area not deliverable. We are expanding soon...');
    delivery = false;
    return delivery;
  } else {
    delivery = true;
    return delivery;
  }
};
