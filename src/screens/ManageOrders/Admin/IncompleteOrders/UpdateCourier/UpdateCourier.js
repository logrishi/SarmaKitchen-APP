import React, {useContext, useState} from 'react';
import {getConfig, isLoggedIn} from 'constants/handleErrors';

import Colors from 'constants/colors';
import MyButton from 'components/MyButton';
import {Picker} from '@react-native-picker/picker';
import {UserContext} from 'context/UserContext';
import {View} from 'react-native';
import styles from './updateCourier.styles';
import {updateOrderCourier} from './updateCourier.actions';

const UpdateCourier = ({
  courier,
  deliveredBy,
  orderId,
  setModalVisible,
  organiseData,
}) => {
  const {storedUserData, setLogOutData} = useContext(UserContext);
  const [selectedCourier, setSelectedCourier] = useState(deliveredBy);

  let accessToken = isLoggedIn(storedUserData);

  const save = async () => {
    updateOrderCourier(orderId, selectedCourier, {
      accessToken,
      setModalVisible,
      organiseData,
    });
  };
  return (
    <View style={styles.screen}>
      <View style={{backgroundColor: Colors.extremeLightGrayish}}>
        <Picker
          mode="dropdown"
          selectedValue={selectedCourier}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCourier(itemValue)}>
          <Picker.Item label="Select Courier" />
          {courier.length
            ? courier.map((e) => {
                return <Picker.Item label={e.name} value={e.name} key={e.id} />;
              })
            : null}
        </Picker>
      </View>

      <View style={styles.btn}>
        <MyButton title="Submit" onPress={() => save()} />
      </View>
    </View>
  );
};

export default UpdateCourier;
