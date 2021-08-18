import React from 'react';

//react-native-elements
import {CheckBox} from 'react-native-elements';

const MyCheckBox = ({id, option, checked, handleCheckBox}) => {
  // console.log('box');
  // console.log(checked);
  const handleChecked = () => {
    for (var i in checked) {
      if (checked[i].option == option) {
        return checked[i].check;
      }
    }
  };

  return (
    <CheckBox
      // checked={
      //   checked.length > 0
      //     ? checked[0].option == option
      //       ? checked[0].check
      //       : false
      //     : false
      // }
      checked={handleChecked()}
      onPress={handleCheckBox}
    />
  );
};

export default React.memo(MyCheckBox);
