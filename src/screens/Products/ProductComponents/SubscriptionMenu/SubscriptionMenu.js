import {FlatList, Image, Text, View} from 'react-native';

import React from 'react';
import {image_url} from 'constants/url';
import styles from './subscriptionMenu.styles';

const SubscriptionMenu = ({filteredProducts}) => {
  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredProducts}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.cardView}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${image_url}/${item.image}`,
                }}
                style={styles.image}
              />
            </View>
            <View>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.name.toString()}
      />
    </View>
  );
};

export default SubscriptionMenu;
