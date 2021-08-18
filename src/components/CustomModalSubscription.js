import React, {useState, useContext} from 'react';
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
import OrderSubscriptionModal from 'screens/products/components/OrderSubscriptionModal';
import OrderSubscriptionModalButton from 'screens/products/components/OrderSubscriptionModalButton';

//context
import {CartContext} from 'context/CartContext';

//animation
import * as Animatable from 'react-native-animatable';

const CustomModalSubscription = ({
  customId,
  customizations,
  product,
  productsWithCustomizations,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState([]);
  const {cartItems} = useContext(CartContext);

  // checkbox true false
  const handleCheckBox = (customizations_id, customizations_option) => {
    if (checked.length) {
      const exists = checked.find(e => e.id == customizations_id);
      if (exists) {
        const optionExists = checked.find(
          e => e.option == customizations_option,
        );
        const existingArr = [...checked];
        const currIndex = existingArr.indexOf(exists);

        if (!optionExists) {
          existingArr[currIndex].id = customizations_id;
          existingArr[currIndex].option = customizations_option;
          existingArr[currIndex].check = true;
          setChecked(existingArr);
        }
      } else {
        const existingArr = [...checked];
        const currIndex = existingArr.indexOf(exists);
        setChecked(checked => [
          ...checked,
          {
            // randomId: existingArr[currIndex].randomId,
            id: customizations_id,
            option: customizations_option,
            check: true,
          },
        ]);
      }
    } else {
      // let random = generateRandomNo();
      // console.log('random', random);
      setChecked([
        {
          // randomId: random,
          id: customizations_id,
          option: customizations_option,
          check: true,
        },
      ]);
    }
  };

  const addCustomizationToProduct = () => {
    // console.log(product);
    let customizedProduct = {};

    customizedProduct = {
      customId: product.customId,
      productId: product.id,
      product_details_id: product.product_details_id,
      name: product.name,
      description: product.description,
      is_customizable: product.is_customizable,
      is_veg: product.is_veg,
      product_details_size: product.product_details_size,
      product_details_note: product.product_details_note,
      product_details_price: product.product_details_price,
      product_details_stock: product.product_details_stock,
      product_details_image: product.product_details_image,
      product_details_for_sale: product.product_details_for_sale,
      sub_categories_sub_category: product.sub_categories_sub_category,
      subscription_duration: product.subscription_duration,
      selectedCustomizations: checked.map(e => e.option),
    };
    productsWithCustomizations(customId, customizedProduct);
    setModalVisible(false);

    // console.log('customizedProduct', customizedProduct);
  };

  // console.log('checked', checked);

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {customizations.map(e => (
              <View style={styles.container} key={e.customizations_id}>
                <Text style={styles.customizationsNameText}>
                  Select {e.customizations_name}
                </Text>

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
                    <Text style={styles.customizationsOptionText}>{o}</Text>
                  </View>
                ))}
              </View>
            ))}

            {customizations.length == checked.length ? (
              <Animatable.View animation="zoomInUp" style={styles.msgView}>
                <CustomButtonSquare
                  title="Apply"
                  style={styles.btn}
                  onPress={addCustomizationToProduct}
                />
              </Animatable.View>
            ) : (
              <View style={styles.msgView}>
                <Text style={styles.msgText}>
                  * Select a choice of each customization type
                </Text>
              </View>
            )}
            <CustomButtonSquare
              title="Cancel"
              style={styles.cancelModal}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal>
      <Animatable.View animation="zoomInUp">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.customizeBtn}>Customize</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  modalView: {
    backgroundColor: Colors.background,
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    padding: calcHeight(4),
    alignItems: 'center',
    elevation: 5,
  },
  cancelModal: {
    backgroundColor: Colors.background,
    color: Colors.primary,
    padding: calcWidth(2),
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    width: calcWidth(22),
    height: screenWidth > 500 ? calcHeight(5.5) : calcHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(4),
    fontFamily: 'sans-serif-medium',
  },
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#F194FF',
    width: calcWidth(70),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.extremeLightGrayish,
    width: '100%',
  },
  customizationsNameText: {
    fontSize: screenWidth > 500 ? calcWidth(2) : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
    alignSelf: 'flex-start',
  },
  customizationsOptionText: {},
  msgView: {
    marginVertical: calcHeight(1),
    height: screenWidth > 500 ? calcHeight(5.5) : calcHeight(5),
  },
  msgText: {
    color: Colors.primary,
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
    height: screenWidth > 500 ? calcHeight(5.5) : calcHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(4),
    fontFamily: 'sans-serif-medium',
  },
  customizeBtn: {
    // backgroundColor: Colors.extremeLightGrayish,
    color: 'green',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2) : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
});
export default CustomModalSubscription;
