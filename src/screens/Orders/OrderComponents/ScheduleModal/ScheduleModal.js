import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import Colors from 'constants/colors';
import MyModal from 'components/MyModal';
import styles from './scheduleModal.styles';

const ScheduleModal = ({schedule}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showHeading = () => {
    return (
      <View style={styles.headerComponentContainer}>
        <View style={styles.headerComponentView}>
          <Text style={styles.headerComponentText}>Day</Text>
        </View>
        <View style={styles.headerComponentView}>
          <Text style={styles.headerComponentText}>Date</Text>
        </View>
        <View style={styles.headerComponentView}>
          <Text style={styles.headerComponentText}>Dish</Text>
        </View>
        <View style={styles.headerComponentView}>
          <Text style={styles.headerComponentText}>Order Status</Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <MyModal
        isVisible={modalVisible}
        setModalVisible={setModalVisible}
        bottom={100}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Susbscription Delivery Details</Text>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={schedule}
            ListHeaderComponent={showHeading}
            renderItem={({item, index}) => (
              <View style={styles.container}>
                <View
                  style={[
                    styles.detailsContainer,
                    index % 2 !== 0
                      ? {backgroundColor: Colors.extremeLightGrayish}
                      : null,
                  ]}>
                  <View style={styles.detailsView}>
                    <Text style={styles.detailsText}>{index + 1}.</Text>
                  </View>

                  <View style={styles.detailsView}>
                    <Text style={styles.detailsText}>{item.delivery_date}</Text>
                  </View>

                  <View style={styles.detailsView}>
                    <Text style={styles.detailsText}>
                      {item.product_delivered
                        ? item.product_delivered
                        : 'In Process'}
                    </Text>
                  </View>

                  <View style={styles.detailsView}>
                    <Text style={styles.detailsText}>{item.order_status}</Text>
                    {item.remarks ? <Text>{item.remarks}</Text> : null}
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </MyModal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.scheduleBtnTouchable}>
        <Text style={styles.scheduleBtn}>View Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleModal;
