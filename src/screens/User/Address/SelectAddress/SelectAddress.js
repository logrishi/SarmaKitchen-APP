import React, {useContext, useEffect, useState} from 'react';
import {
  checkDelivery,
  getLocation,
  getStoreLocationInfo,
  requestLocationPermission,
} from 'constants/location';
import {errorToast, infoToast} from 'constants/toasts';
import {handleErrors, isLoggedIn} from 'constants/handleErrors';

import AddAddress from 'screens/User/Address/AddAddress';
import LocateMe from '../Map/LocateMe';
import Map from '../Map';
import MapCard from '../Map/MapCard';
import SelectAddressUI from './SelectAddressUI/SelectAddressUI';
import {UserContext} from 'context/UserContext';
import {View} from 'react-native';
import {getAddress} from './selectAddress.actions';
import {showSwing} from 'constants/loading';
import styles from './selectAddress.styles';

const SelectAddress = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState();
  const [baseCoordinates, setBaseCoordinates] = useState();
  const [maxDistance, setMaxDistance] = useState();
  const [currentCoords, setCurrentCoords] = useState();
  const [changedCoords, setChangedCoords] = useState();
  const [locationAddress, setLocationAddress] = useState();
  const [confirmedLocationAddress, setConfirmedLocationAddress] = useState();
  const [showMap, setShowMap] = useState('default');

  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState([]);
  const [deliveryMsg, setDeliveryMsg] = useState();
  const {storedUserData, setLogOutData} = useContext(UserContext);
  let accessToken = isLoggedIn(storedUserData);

  useEffect(() => {
    getAddress({accessToken, setIsLoading, setAddress, setPhone});
    navigation.addListener('focus', () => {
      getAddress({accessToken, setIsLoading, setAddress, setPhone});
    });
  }, []);

  useEffect(() => {
    if (address.length) {
      setShowMap('showAddress');
    } else {
      setShowMap('showMap');
    }
  }, [address]);

  useEffect(() => {
    getPermissions();
  }, []);

  //permissions
  const getPermissions = async () => {
    let perm = await requestLocationPermission();
    setLocationPermission(perm);
  };

  //location
  useEffect(() => {
    if (locationPermission) {
      callGetLocation();
      getStoreLocationInfo({setIsLoading}, (res, err) => {
        setBaseCoordinates(res.baseCoordinates);
        setMaxDistance(res.maxDistance);
      });
    }
  }, [locationPermission]);

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

  useEffect(() => {
    if (changedCoords && baseCoordinates && maxDistance) {
      let delivery = checkDelivery({
        baseCoordinates,
        maxDistance,
        coords: changedCoords,
      });
      if (!delivery) {
        // console.log('if', delivery);
        setDeliveryMsg('* Area not deliverable. We are expanding soon...');
      } else {
        setDeliveryMsg();
      }
    }
  }, [changedCoords, baseCoordinates, maxDistance]);

  const goToPayment = async (values) => {
    if (!checked.length) {
      infoToast('Please select an address to continue', 0.8);
    } else {
      let delivery = checkDelivery({
        baseCoordinates,
        maxDistance,
        coords: checked[0].address_coords,
      });
      if (delivery) {
        navigation.navigate('Payment', {
          phone_no: values.phone_no,
          address_id: checked[0].id,
          address: checked[0].address,
        });
      } else {
        errorToast('* Area not deliverable. We are expanding soon...', 0.8);
      }
    }
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        showSwing
      ) : address.length &&
        phone &&
        // !confirmedLocationAddress &&
        showMap == 'showAddress' ? (
        <SelectAddressUI
          phone={phone}
          setChecked={setChecked}
          checked={checked}
          goToPayment={goToPayment}
          accessToken={accessToken}
          setIsLoading={setIsLoading}
          address={address}
          setAddress={setAddress}
          navigation={navigation}
          setShowMap={setShowMap}
          setConfirmedLocationAddress={setConfirmedLocationAddress}
          setCurrentCoords={setCurrentCoords}
        />
      ) : currentCoords && !confirmedLocationAddress && showMap == 'showMap' ? (
        <Map
          isLoading={isLoading}
          setLocationAddress={setLocationAddress}
          setCurrentCoords={setCurrentCoords}
          currentCoords={currentCoords}
          setChangedCoords={setChangedCoords}
          locateMe={<LocateMe />}
          mapCard={
            <MapCard
              locationAddress={locationAddress}
              deliveryMsg={deliveryMsg}
              setConfirmedLocationAddress={setConfirmedLocationAddress}
              setShowMap={setShowMap}
            />
          }
        />
      ) : confirmedLocationAddress && showMap == 'hideMap' ? (
        <AddAddress
          phone={phone}
          confirmedLocationAddress={confirmedLocationAddress}
          setConfirmedLocationAddress={setConfirmedLocationAddress}
          changedCoords={changedCoords}
          setDeliveryMsg={setDeliveryMsg}
          deliveryMsg={deliveryMsg}
          setShowMap={setShowMap}
        />
      ) : null}
    </View>
  );
};

export default React.memo(SelectAddress);
