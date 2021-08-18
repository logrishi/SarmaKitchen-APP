import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActionSheetIOS,
} from 'react-native';

//constants
import {deviceWidth, calcWidth, calcHeight} from 'constants/deviceConfig';
import Colors from 'constants/colors';

//forms & validation
import {Formik} from 'formik';
import * as yup from 'yup';

const CustomInput = ({formikProps, value, ...props}) => {
  // console.log(props.style);
  return (
    <View>
      <TextInput
        onChangeText={formikProps.handleChange(value)}
        onBlur={formikProps.handleBlur(value)}
        style={{...styles.textInput, ...props.style}}
        {...props}
      />
      <View style={{...styles.clientErrorContainer, ...props.style}}>
        {/* client val error */}
        <Text style={{...styles.clientErrorText, ...props.style}}>
          {formikProps.touched[value] && formikProps.errors[value]}
        </Text>
        {/* server val error - do manually where customInput used */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: calcWidth(80),
    padding: calcWidth(2),
    borderRadius: deviceWidth / 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
  clientErrorContainer: {
    alignSelf: 'center',
    paddingTop: calcHeight(0.5),
  },
  clientErrorText: {
    color: Colors.primary,
  },
});

export default CustomInput;
