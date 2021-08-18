import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';

//fonts
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//constants
import Colors from 'constants/colors';

//Location
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const Location = () => {
  const [pos, setPosition] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    // get permission
    const hasLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    // if granted
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          // setPosition(position);
          getLocationName(position);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const getLocationName = async pos => {
    //  get place name from lat-long
    Geocoder.init('AIzaSyBDEalZVkuc7mP01saLwYpYfQs2kO2m9ks'); // Google API Key
    if (pos) {
      Geocoder.from(pos.coords.latitude, pos.coords.longitude)
        .then(json => {
          var addressComponent = json.results[0].address_components[0];
          console.log(addressComponent);
        })
        .catch(error => console.warn(error));
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={getLocation}>
        <MaterialIcons name="location-on" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <Text />
    </View>
  );
};

export default Location;
