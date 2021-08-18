import Colors from 'constants/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    color: '#eeeeee',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    // backgroundColor: 'white',
    backgroundColor: Colors.themeText,
    padding: 20,
    paddingTop: 0,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  dragBar: {
    width: 35,
    height: 5,
    borderRadius: 3,
    // backgroundColor: 'grey',
    backgroundColor: 'white',
  },
  dragBarContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    // borderWidth: 1,
    borderColor: 'white',
    height: 30,
  },
});

export default styles;
