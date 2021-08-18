import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import Colors from 'constants/colors';
import React from 'react';
import {getProducts} from './mealTabs.actions';
import styles from './mealTabs.styles';

const MealTabs = ({
  meals,
  subscriptions,
  setSelectedMeal,
  selectedMeal,
  setProducts,
  setIsListLoading,
}) => {
  // const [selectedMeal, setSelectedMeal] = useState(selected_meal_type);

  const handlePress = (meal_type) => {
    setSelectedMeal(meal_type);
    getProducts({meal_type, subscriptions, setProducts, setIsListLoading});
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={meals}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.mealsContainer}>
            <TouchableOpacity
              style={[
                styles.mealsView,
                {
                  backgroundColor:
                    item.name == selectedMeal ? 'orange' : Colors.lightGrayish,
                  borderBottomWidth: item.name == selectedMeal ? 4 : null,
                  borderBottomColor: item.name == selectedMeal ? 'black' : null,
                },
              ]}
              onPress={() => handlePress(item.name)}>
              <Text style={styles.mealsText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.name.toString()}
      />
    </View>
  );
};

export default MealTabs;
