import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

//constants
import {screenWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';

//fonts
import Foundation from 'react-native-vector-icons/Foundation';

const NewOrderIcon = ({id, data}) => {
  return (
    <View>
      {Object.keys(data).length > 0
        ? data.map((e) =>
            e.value == 0 && e.id == id ? (
              <View key={id}>
                <Foundation
                  name="burst-new"
                  color="red"
                  style={styles.icon}
                  size={calcHeight(5)}
                />
              </View>
            ) : null,
          )
        : null}
    </View>
  );
};

const styles = StyleSheet.create({});
export default NewOrderIcon;
