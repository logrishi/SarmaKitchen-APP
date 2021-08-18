import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';

// dropdown
import {Picker} from '@react-native-picker/picker';

const CustomPicker = (props) => {
  const [orderStatus, setOrderStatus] = useState('');

  return (
    <View style={{...styles.container, ...props.style}}>
      <Picker
        mode="dropdown"
        selectedValue="Select"
        // style={styles.picker}
        // onValueChange={(itemValue, itemIndex) => handleChange(props)}
      >
        <Picker.Item label="Select status " value="" />
        <Picker.Item label="Accepted" value="Accepted" />
        <Picker.Item label="Packed" value="Packed" />
        <Picker.Item label="Out For Delivery" value="OutForDelivery" />
        <Picker.Item label="Delivered" value="Delivered" />
        <Picker.Item label="Cancel" value="Cancel" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomPicker;
