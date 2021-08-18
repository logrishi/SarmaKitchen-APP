import Colors from 'constants/colors';
import {StyleSheet} from 'react-native';
import {calcHeight} from 'constants/deviceConfig';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.transparent,
  },
  modalView: {
    backgroundColor: Colors.background,
    borderRadius: scale(10),
    padding: scale(20),
    alignItems: 'center',
    elevation: 5,
  },
  filterView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  filterText: {
    fontSize: scale(10),
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
  },
  btn: {
    marginVertical: calcHeight(1),
  },
});

export default styles;
