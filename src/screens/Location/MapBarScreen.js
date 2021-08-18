import React, {useEffect, useState, useContext, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//usenavigation
import {useNavigation} from '@react-navigation/native';

//constants
import {screenWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {showSwing} from 'constants/loading';

//components
import Card from 'components/Card';

//fonts
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//components
import MyButton from 'components/MyButton';

//context
import {LocationContext} from 'context/LocationContext';

//rn maps
import MapView from 'react-native-maps';

const MapBar = () => {
  const {
    coords,
    setUserCoords,
    location,
    deliveryMsg,
    setLocation,
  } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const mapViewRef = useRef(null);

  const handleAddressConfirm = () => {
    setLocation(location);
    navigation.goBack();
  };

  //move to current location pin function
  const locateMe = () => {
    return (
      <TouchableOpacity style={styles.locateMe} onPress={moveToCurrentLocation}>
        <Card>
          <MaterialCommunityIcons
            name="crosshairs-gps"
            color="red"
            size={calcHeight(5)}
          />
        </Card>
      </TouchableOpacity>
    );
  };

  //move to current location pin
  const moveToCurrentLocation = () => {
    mapViewRef.current.animateToRegion(coords, 1000);
  };

  return (
    <View style={styles.screen}>
      {/* {!coords ? ( */}
      {coords == undefined ? (
        showSwing
      ) : (
        <View style={styles.map}>
          <MapView
            ref={mapViewRef}
            // style={[styles.map, {margin: margin}]}
            // onMapReady={mapMargins}
            style={styles.map}
            initialRegion={coords}
            showsUserLocation={true}
            showsMyLocationButton={false}
            mapType="standard"
            loadingEnabled={true}
            onRegionChangeComplete={(region) => setUserCoords(region)}
            followsUserLocation={true}
          />
          <View style={styles.marker} pointerEvents="none">
            <MaterialIcons
              name="person-pin-circle"
              color="red"
              size={calcHeight(5)}
            />
          </View>
        </View>
      )}
      {locateMe()}

      <Card style={styles.addressContainer}>
        <View style={styles.addressView}>
          <MaterialIcons
            name="person-pin-circle"
            color="red"
            size={calcHeight(5)}
            style={styles.icon}
          />
          {location ? (
            <View style={styles.addressTextView}>
              <Text style={styles.addressText}>{location}</Text>
            </View>
          ) : (
            showSwing
          )}
        </View>
        <View style={styles.deliveryMsgView}>
          {location ? (
            <Text style={styles.deliveryMsgText}>{deliveryMsg}</Text>
          ) : null}
        </View>
        <View style={styles.btnContainer}>
          <MyButton
            title="Confirm"
            style={styles.btn}
            onPress={handleAddressConfirm}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locateMe: {
    position: 'absolute',
    left: calcWidth(80),
    bottom: calcHeight(30),
    // backgroundColor: 'white',
    // width: 100,
  },
  marker: {
    flex: 1,
    // zIndex: 3,
    position: 'absolute',
    marginTop: screenWidth > 500 ? calcHeight(-5) : calcHeight(-5),
    // marginLeft: -17,
    marginLeft:
      screenWidth > 700
        ? calcWidth(-3.5)
        : screenWidth > 500
        ? calcWidth(-4.5)
        : calcWidth(-4.5),
    // marginRight: 50,
    // marginBottom: 50,
    left: '50%',
    top: '50%',
    margin: 'auto',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  addressContainer: {
    height: calcHeight(24),
    // backgroundColor: 'red',
    backgroundColor: Colors.background,
    position: 'absolute',
    bottom: calcHeight(4),
    left: calcWidth(3.5),
    width: calcWidth(92),
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  addressView: {
    flex: 1,
    flexDirection: 'row',
    // width: calcWidth(90),
    width: '100%',
    backgroundColor: Colors.extremeLightGrayish,
    alignItems: 'center',
  },
  icon: {
    // marginRight: calcWidth(5),
    marginHorizontal: calcWidth(2),
  },
  addressTextView: {
    flex: 1,
  },
  addressText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  deliveryMsgView: {
    // backgroundColor: 'red',
    alignItems: 'center',
    // width: calcWidth(80),
  },
  deliveryMsgText: {
    color: Colors.primary,
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  btnContainer: {
    marginVertical: calcHeight(1),
  },
  btn: {
    backgroundColor: Colors.background,
    color: 'green',
    borderColor: Colors.darkGrayish,
    padding: calcWidth(2),
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    width: screenWidth > 500 ? calcWidth(22) : calcWidth(30),
    height:
      screenWidth > 700
        ? calcHeight(5.5)
        : screenWidth > 500
        ? calcHeight(5)
        : calcHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(4),
    fontFamily: 'sans-serif-medium',
  },
});

export default MapBar;
