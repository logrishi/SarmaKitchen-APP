import React from 'react';

//constants
import {screenWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';

//react-native-elements
import {CheckBox} from 'react-native-elements';

const MyCheckBox = ({id, checked, handleCheckBox, title}) => {
  // console.log('box');
  return (
    <CheckBox
      containerStyle={{
        flex: 1,
        // alignItems: 'flex-start',
        // backgroundColor: 'green',
      }}
      title={title}
      textStyle={{
        fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(3),
      }}
      fontFamily="sans-serif-light"
      checked={
        checked.length > 0
          ? checked[0].id == id
            ? checked[0].check
            : false
          : false
      }
      onPress={handleCheckBox}
    />
  );
};

export default React.memo(MyCheckBox);
