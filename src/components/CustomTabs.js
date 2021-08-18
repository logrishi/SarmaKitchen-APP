import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

//constants
import {
  calcWidth,
  calcHeight,
  screenWidth,
  screenHeight,
} from 'constants/deviceConfig';
import Colors from 'constants/colors';

const CustomTabs = ({tabData, style, handlePress, active}) => {
  return (
    <View>
      <FlatList
        data={tabData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => handlePress(item.sub_category)}
            style={[
              {
                ...styles.container,
                ...style,
                backgroundColor:
                  item.sub_category == active
                    ? Colors.extremeLightGrayish
                    : Colors.background,
              },
            ]}>
            <View>
              <Text style={{...styles.text, ...style}}>
                {item.sub_category}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: calcWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
    // borderRightWidth: 1,
  },
  text: {
    fontSize: screenWidth > 500 ? calcWidth(3) : calcWidth(4),
  },
});
export default CustomTabs;
