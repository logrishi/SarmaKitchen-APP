import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';

import Banners from 'components/Banners';
import Categories from './HomeComponents/Categories';
import LocationBar from 'screens/Location/LocationBar';
import styles from './home.styles';

const Home = ({navigation}) => {
  return (
    <ScrollView style={styles.screen}>
      <LocationBar navigation={navigation} />
      <View style={styles.bannerView}>
        <Banners />
      </View>
      <Categories navigation={navigation} />
    </ScrollView>
  );
};

export default Home;
