import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {image_url} from 'constants/url';
import styles from './mealThumbnails.styles';

const MealThumbnails = ({
  meals,
  subscriptions,
  category_id,
  category,
  navigation,
}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.categoryView}>
        <Text style={styles.categoryText}>{category}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={meals}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.mealTypeContainer}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() =>
                  navigation.navigate('Products', {
                    meal_type: item.name,
                    subscriptions: subscriptions,
                    meals: meals,
                    category_id: category_id,
                  })
                }>
                <Image
                  source={{
                    uri: `${image_url}/${item.image}`,
                  }}
                  style={styles.image}
                />
                <Text style={styles.mealTypeText}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.name.toString()}
        />
      </View>
    </View>
  );
};

export default MealThumbnails;
