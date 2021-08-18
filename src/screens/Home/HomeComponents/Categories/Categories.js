import React, {useEffect, useState} from 'react';

import MealThumbnails from 'screens/Home/HomeComponents/MealThumbnails';
import {View} from 'react-native';
import {getCategories} from './categories.actions';
import styles from './categories.styles';

const Categories = ({navigation}) => {
  const [category, setCategory] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getCategories({setCategory, setSubscriptions});
  }, []);

  return (
    <View style={styles.screen}>
      {category.length ? (
        <View style={{flex: 1}}>
          {category.map((e) => (
            <MealThumbnails
              meals={e.meal_type}
              subscriptions={subscriptions}
              category_id={e.id}
              category={e.category}
              navigation={navigation}
              key={e.id}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default Categories;
