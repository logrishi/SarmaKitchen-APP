import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  calcHeight,
  calcWidth,
  screenHeight,
  screenWidth,
} from 'constants/deviceConfig';
import {
  checkDelivery,
  getAddressFromCoords,
  getLocation,
  getStoreLocationInfo,
  requestLocationPermission,
} from 'constants/location';
import {showFlow, showSwing} from 'constants/loading';

import Colors from 'constants/colors';
import {LocationContext} from 'context/LocationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LocationBar = ({navigation}) => {
  // const {location, deliveryMsg} = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState();
  const [baseCoordinates, setBaseCoordinates] = useState();
  const [maxDistance, setMaxDistance] = useState();
  const [currentCoords, setCurrentCoords] = useState();
  const [locationAddress, setLocationAddress] = useState();
  const [deliveryMsg, setDeliveryMsg] = useState();

  useEffect(() => {
    getPermissions();
  }, []);

  //permissions
  const getPermissions = async () => {
    let perm = await requestLocationPermission();
    setLocationPermission(perm);
  };

  useEffect(() => {
    if (locationPermission) {
      callGetLocation();
      getStoreLocationInfo({setIsLoading}, (res, err) => {
        setBaseCoordinates(res.baseCoordinates);
        setMaxDistance(res.maxDistance);
      });
    }
  }, [locationPermission]);

  useEffect(() => {
    if (currentCoords && baseCoordinates && maxDistance) {
      getAddressFromCoords(currentCoords, (address) => {
        setLocationAddress(address);
      });
      let delivery = checkDelivery({
        baseCoordinates,
        maxDistance,
        coords: currentCoords,
      });
      if (!delivery) {
        setDeliveryMsg('* Area not deliverable. We are expanding soon...');
      } else {
        setDeliveryMsg();
      }
    }
  }, [currentCoords, baseCoordinates, maxDistance]);

  const callGetLocation = () => {
    getLocation((position, err) => {
      if (position) {
        setIsLoading(true);
        setCurrentCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <TouchableOpacity
      style={styles.screen}
      // onPress={() => navigation.navigate('MapBarScreen')}
    >
      <View style={styles.iconView}>
        <MaterialIcons
          name="person-pin-circle"
          color="red"
          size={calcHeight(3)}
        />
      </View>
      <View style={styles.textView}>
        {locationAddress ? (
          <View>
            <Text style={styles.locationText}>{locationAddress}</Text>
            {deliveryMsg ? (
              <Text style={styles.deliveryMsgText}>{deliveryMsg}</Text>
            ) : null}
          </View>
        ) : (
          <View style={{flex: 1}}>{showFlow}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.extremeLightGrayish,
    marginHorizontal: calcWidth(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    alignItems: 'center',
    width: calcWidth(10),
  },
  textView: {
    flex: 1,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
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
    // textAlignVertical:,
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
