import {
  calcHeight,
  calcWidth,
  screenHeight,
  screenWidth,
} from 'constants/deviceConfig';

import Colors from 'constants/colors';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'row',
    width: calcWidth(60),
    alignSelf: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ead7d7',
    // backgroundColor: Colors.lightGrayish,
    borderRadius: screenWidth / 20,
    padding: calcWidth(8),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  cancel: {
    backgroundColor: 'white',
    width: calcWidth(22),
    borderRadius: screenWidth / 20,
    padding: calcWidth(3),
    elevation: 2,
    marginRight: calcWidth(2),
  },
  signout: {
    backgroundColor: Colors.signOut,
    width: calcWidth(22),
    borderRadius: screenWidth / 20,
    padding: calcWidth(3),
    elevation: 2,
    marginLeft: calcWidth(2),
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: calcWidth(4),
  },
});

export default styles;
