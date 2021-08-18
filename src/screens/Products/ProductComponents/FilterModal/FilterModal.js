import {Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {CheckBox} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyButton from 'components/MyButton';
import {calcHeight} from 'constants/deviceConfig';
import {handleCheck} from './filterModal.actions';
import {scale} from 'react-native-size-matters';
import styles from './filterModal.styles';

const FilterModal = ({products, setProducts}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState([]);

  //  const handleCheck = (mealType) => {
  //    const exists = checked.find((e) => e.id == mealType);
  //    if (!exists) {
  //      setChecked([
  //        {
  //          id: mealType,
  //          check: true,
  //        },
  //      ]);
  //    }
  //    if (mealType == 'veg') {
  //      let filtered = products.filter((e) => e.is_veg);
  //      setProducts(filtered);
  //      setModalVisible(!modalVisible);
  //    } else if (mealType == 'nonveg') {
  //      let filtered = products.filter((e) => e.is_veg == 0);
  //      setProducts(filtered);
  //      setModalVisible(!modalVisible);
  //    } else if (mealType == 'all') {
  //      setProducts(products);
  //      setModalVisible(!modalVisible);
  //    }
  //  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.btnContainer}>
              <View style={styles.row}>
                <CheckBox
                  title="Veg Only"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  textStyle={{fontSize: scale(12)}}
                  onPress={() =>
                    handleCheck({
                      mealType: 'veg',
                      products,
                      setProducts,
                      setModalVisible,
                      setChecked,
                      checked,
                      modalVisible,
                    })
                  }
                  checked={
                    checked.length > 0
                      ? checked[0].id == 'veg'
                        ? checked[0].check
                        : false
                      : false
                  }
                />
                <CheckBox
                  title="Non Veg Only"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  textStyle={{fontSize: scale(12)}}
                  onPress={() =>
                    handleCheck({
                      mealType: 'nonveg',
                      products,
                      setProducts,
                      setModalVisible,
                      setChecked,
                      checked,
                      modalVisible,
                    })
                  }
                  checked={
                    checked.length > 0
                      ? checked[0].id == 'nonveg'
                        ? checked[0].check
                        : false
                      : false
                  }
                />
                <CheckBox
                  title="All"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  textStyle={{fontSize: scale(12)}}
                  onPress={() =>
                    handleCheck({
                      mealType: 'all',
                      products,
                      setProducts,
                      setModalVisible,
                      setChecked,
                      checked,
                      modalVisible,
                    })
                  }
                  checked={
                    checked.length > 0
                      ? checked[0].id == 'all'
                        ? checked[0].check
                        : false
                      : false
                  }
                />
              </View>
              <MyButton
                title="Close"
                style={styles.btn}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.filterView}>
        <MaterialIcons name="filter-list" size={calcHeight(3)} />
        <Text style={styles.filterText}>Filter Meals</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterModal;
