import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//constants
//constants
import {
  calcWidth,
  calcHeight,
  screenWidth,
  screenHeight,
} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {showSwing} from 'constants/loading';

//context
import {LocationContext} from 'context/LocationContext';

//rn geocoding
import Geocoder from 'react-native-geocoding';

//fonts
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//components
import MapBar from 'screens/products/MapBarScreen';

const LocationBar = ({navigation}) => {
  const {
    getLocation,
    coords,
    getDistance,
    locationPermission,
    requestLocationPermission,
  } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState();
  const [deliveryMsg, setDeliveryMsg] = useState();

  // const [userLocation, setUserLocation] = useState();
  // const [userCoords, setUserCoords] = useState();

  Geocoder.init('AIzaSyBDEalZVkuc7mP01saLwYpYfQs2kO2m9ks');

  useEffect(() => {
    let loc = getLocation();
    setLocation(loc);
  }, []);

  useEffect(() => {
    handleRegionChange();
  }, [coords]);

  useEffect(() => {
    checkDelivery();
  }, [location]);

  //check delivery
  const checkDelivery = () => {
    let delivery = null;
    if (coords !== undefined) {
      delivery = getDistance(coords);
    }
    if (delivery) {
      setDeliveryMsg(null);
    } else {
      setDeliveryMsg('* Area not deliverable. We are expanding soon...');
    }
  };

  //getChangedLocation
  const handleRegionChange = async () => {
    if (coords) {
      Geocoder.from(coords.latitude, coords.longitude)
        .then((json) => {
          var addressComponent = json.results[0].formatted_address;
          setLocation(addressComponent);
          // setUserCoords({
          //   latitude: region.latitude,
          //   longitude: region.longitude,
          // });
          // console.log(addressComponent);
          // console.log(json);
        })
        .catch((error) => console.warn(error));
    }
  };

  return (
    <TouchableOpacity
      style={styles.screen}
      onPress={() => navigation.navigate('MapBarScreen')}>
      {isLoading ? (
        showSwing
      ) : location ? (
        <View>
          <View style={styles.row}>
            <MaterialIcons
              name="person-pin-circle"
              color="red"
              size={calcHeight(3)}
            />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          {deliveryMsg ? (
            <Text style={styles.deliveryMsgText}>{deliveryMsg}</Text>
          ) : null}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.extremeLightGrayish,
    marginHorizontal: calcWidth(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
  },
  locationText: {
    flex: 1,
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3),
    fontFamily: 'sans-serif-medium',
  },
  deliveryMsgText: {
    flex: 1,
    color: Colors.primary,
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3),
    fontFamily: 'sans-serif-medium',
    alignSelf: 'center',
  },
});
export default LocationBar;
