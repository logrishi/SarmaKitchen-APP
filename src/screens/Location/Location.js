import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

//fonts
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//constants
import {calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';

// context
import {LocationContext} from 'context/LocationContext';

const FindMe = () => {
  const {location, getLocation} = useContext(LocationContext);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={getLocation} style={styles.locationContainer}>
        <MaterialIcons name="location-on" size={24} color={Colors.primary} />
        <Text>{location ? location[0].city : <Text>Locating..</Text>}</Text>
      </TouchableOpacity>
      <Text />
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    alignItems: 'center',
    width: calcWidth(30),
    paddingLeft: calcWidth(6),
    paddingTop: calcHeight(2),
  },
  // container: {
  //   // flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: calcWidth(80),
  //   height: calcHeight(80),
  //   marginHorizontal: 20,
  //   marginVertical: 20,
  //   // backgroundColor: "red",
  // },
});
export default FindMe;
