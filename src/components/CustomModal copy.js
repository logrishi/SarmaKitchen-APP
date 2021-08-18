import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

//constants
import {
  calcWidth,
  calcHeight,
  screenWidth,
  screenHeight,
} from 'constants/deviceConfig';
import Colors from 'constants/colors';

//components
import CheckBox from 'components/reusable/CheckBoxCustomization';
import CustomButtonSquare from 'components/reusable/CustomButtonSquare';
import OrderProductButton from 'screens/products/components/OrderProductButton';

const CustomModal = ({customId, customizations, products}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState([]);
  const [count, setCount] = useState(0);
  // checkbox true false
  const handleCheckBox = (
    customizations_id,
    customizations_option,
    customId,
  ) => {
    if (checked.length) {
      const exists = checked.find(e => e.id == customizations_id);
      if (exists) {
        const optionExists = checked.find(
          e => e.option == customizations_option,
        );
        if (!optionExists) {
          const existingArr = [...checked];
          const currIndex = existingArr.indexOf(exists);
          existingArr[currIndex].id = customizations_id;
          existingArr[currIndex].option = customizations_option;
          existingArr[currIndex].check = true;
          setChecked(existingArr);
        } else {
          const existingArr = [...checked];
          const currIndex = existingArr.indexOf(exists);
          existingArr[currIndex].id = customizations_id;
          existingArr[currIndex].option = customizations_option;
          existingArr[currIndex].check = !existingArr[currIndex].check;
          setChecked(existingArr);
        }
      } else {
        setChecked(checked => [
          ...checked,
          {
            id: customizations_id,
            option: customizations_option,
            check: true,
          },
        ]);
      }
    } else {
      setChecked([
        {
          id: customizations_id,
          option: customizations_option,
          check: true,
        },
      ]);
    }
  };
  // customisedValues(checked);
  // console.log('checked', checked);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {customizations.map(e => (
              <View style={styles.container} key={e.customizations_id}>
                <Text>{e.customizations_name}</Text>

                {e.options.map(o => (
                  <View style={styles.row} key={o}>
                    <CheckBox
                      id={e.customizations_id}
                      option={o}
                      checked={checked}
                      handleCheckBox={() =>
                        handleCheckBox(e.customizations_id, o, customId)
                      }
                    />
                    <Text>{o}</Text>
                  </View>
                ))}
              </View>
            ))}
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
            <OrderProductButton
              products={products}
              customisedValues={checked}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Customize Dish</Text>
      </TouchableOpacity>
      <CustomButtonSquare
        style={styles.btn}
        title="ADD"
        onPress={() => {
          setModalVisible(true);
        }}
      />

      <View style={styles.btnContainer}>
        {/* {count == 0 ? ( */}
        {cartItems.find(e => e.customId == customId) ? (
          <Animatable.View animation="fadeInUp">
            <Counter
              style={(styles.counter, styles.count)}
              increment={increment}
              decrement={decrement}
              count={count > 0 ? countQty : count}
              size={calcHeight(3)}
              colorIncrement="green"
              colorDecrement="red"
            />
          </Animatable.View>
        ) : (
          // ) : countQty > 0 ? (
          <Animatable.View animation="zoomInUp">
            <CustomButtonSquare
              title="ADD"
              style={styles.btn}
              onPress={increment}
            />
          </Animatable.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
  },
  btn: {
    backgroundColor: Colors.background,
    // backgroundColor: 'red',
    color: 'green',
    // borderWidth: 1,
    borderColor: Colors.darkGrayish,
    padding: calcWidth(2),
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    width: calcWidth(22),
    height: screenWidth > 500 ? calcHeight(5) : calcHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(4),
    fontFamily: 'sans-serif-medium',
  },
});
export default CustomModal;
