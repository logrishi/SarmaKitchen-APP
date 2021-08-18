import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MyModal from 'components/MyModal';
import {calcHeight} from 'constants/deviceConfig';
import styles from './menuModal.styles';

const MenuModal = ({menu}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <MyModal isVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Menu Items</Text>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={menu}
            renderItem={({item}) => (
              <View style={styles.container}>
                <View style={styles.iconContainer}>
                  {item.is_veg ? (
                    <FontAwesome5
                      name="dot-circle"
                      color="green"
                      size={calcHeight(1.5)}
                      style={styles.vegIcon}
                    />
                  ) : (
                    <FontAwesome5
                      name="dot-circle"
                      color="red"
                      style={styles.vegIcon}
                      size={calcHeight(1.5)}
                    />
                  )}
                </View>
                <View style={styles.productNameView}>
                  <Text style={styles.productNameText}>{item.name}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.name.toString()}
          />
        </View>
      </MyModal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.menuBtnTouchable}>
        <Text style={styles.menuBtn}>View Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuModal;
