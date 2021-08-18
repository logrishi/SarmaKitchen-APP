import React, {useRef} from 'react';

import MapView from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';
import {calcHeight} from 'constants/deviceConfig';
import {getAddressFromCoords} from 'constants/location';
import {showSwing} from 'constants/loading';
import styles from './map.styles';

const Map = ({
  isLoading,
  setLocationAddress,
  currentCoords,
  setChangedCoords,
  children,
  locateMe,
  mapCard,
}) => {
  const mapViewRef = useRef(null);

  //getChangedLocation
  const handleRegionChange = async (region) => {
    getAddressFromCoords(region, (address) => {
      setLocationAddress(address);
      setChangedCoords({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    });
  };
  //move to current location pin
  const moveToCurrentLocation = () => {
    mapViewRef.current.animateToRegion(currentCoords, 1000);
  };

  //reqd if using default showsMyLocationButton
  // const mapMargins = () => {
  //   setMargin(0);
  // };

  return (
    <View style={styles.screen}>
      {isLoading && !currentCoords ? (
        showSwing
      ) : (
        <View style={styles.map}>
          <MapView
            ref={mapViewRef}
            // style={[styles.map, {margin: margin}]}
            // onMapReady={mapMargins}
            style={styles.map}
            initialRegion={currentCoords}
            showsUserLocation={true}
            showsMyLocationButton={false}
            mapType="standard"
            loadingEnabled={true}
            onRegionChangeComplete={(region) => handleRegionChange(region)}
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

      {children}
      {locateMe && React.cloneElement(locateMe, {moveToCurrentLocation})}
      {mapCard ? mapCard : null}
    </View>
  );
};

export default Map;
