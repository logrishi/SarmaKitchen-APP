import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import Colors from 'constants/colors';
import Logout from '../Auth/Logout';
import {UserContext} from 'context/UserContext';
import styles from './profile.styles';

const Profile = ({navigation}) => {
  const {storedUserData} = useContext(UserContext);
  return (
    <View style={styles.screen}>
      <View style={styles.detailsView}>
        <Text style={styles.detailsText}>Name: {storedUserData.user.name}</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.detailsView}>
        <Text style={styles.detailsText}>
          Email: {storedUserData.user.email}
        </Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.detailsView}>
        <Text style={styles.detailsText}>
          Phone: {storedUserData.user.phone_no}
        </Text>
      </View>
      <View style={styles.divider}></View>
      <View
        style={[
          styles.detailsView,
          {flexDirection: 'row', alignItems: 'center'},
        ]}>
        <Text style={styles.detailsText}>FAQ: </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Faq');
          }}>
          <Text style={[styles.detailsText, {color: Colors.btnBlue}]}>
            All your queries answered 😀
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider}></View>
      <View
        style={[
          styles.detailsView,
          {flexDirection: 'row', alignItems: 'center'},
        ]}>
        <Text style={styles.detailsText}>Logout: </Text>
        <Logout />
      </View>
      <View style={styles.divider}></View>
    </View>
  );
};

export default Profile;
