import React, {useEffect, useState} from 'react';

import FilterModal from './ProductComponents/FilterModal';
import MealTabs from './ProductComponents/MealTabs';
import OneTimeProducts from './ProductComponents/OneTimeProducts';
import SubscriptionProducts from './ProductComponents/SubscriptionProducts';
import SubscriptionTabs from './ProductComponents/SubscriptionTabs';
import {View} from 'react-native';
import {getProducts} from './products.actions';
import {showSwing} from 'constants/loading';
import {source} from 'constants/axiosCalls';
import styles from './products.styles';

const Products = ({route, navigation}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);
  const meal_type = route.params.meal_type;
  const subscriptions = route.params.subscriptions;
  const meals = route.params.meals;
  const category_id = route.params.category_id;

  const [selectedSubscription, setSelectedSubscription] = useState(
    subscriptions[0],
  );
  const [selectedMeal, setSelectedMeal] = useState(meal_type);

  useEffect(() => {
    let cancelToken = source.token;
    let isMounted = true;
    if (isMounted) {
      getProducts({
        meal_type,
        subscriptions,
        setProducts,
        setFilteredProducts,
        setIsListLoading,
        cancelToken,
      });
    }
    return () => source.cancel('Operation canceled by the user.');
  }, []);

  return (
    <View style={styles.screen}>
      {isLoading ? (
        showSwing
      ) : (
        <View style={styles.container}>
          {category_id == 1 ? (
            <SubscriptionTabs
              // selected_meal_type={meal_type}
              selectedMeal={selectedMeal}
              subscriptions={subscriptions}
              setProducts={setProducts}
              setIsListLoading={setIsListLoading}
              selectedSubscription={selectedSubscription}
              setSelectedSubscription={setSelectedSubscription}
            />
          ) : null}
          <View
            style={[
              styles.mealTabsContainer,
              {width: category_id == 1 ? '60%' : '100%'},
            ]}>
            <MealTabs
              meals={meals}
              // selected_meal_type={meal_type}
              subscriptions={subscriptions}
              setSelectedMeal={setSelectedMeal}
              selectedMeal={selectedMeal}
              setProducts={setProducts}
              setIsListLoading={setIsListLoading}
            />

            {category_id == 1 && selectedSubscription == 1 ? (
              <FilterModal
                products={filteredProducts}
                setProducts={setProducts}
                meals={meals}
                // productsCopy={productsCopy}
                // setFilteredProducts={setFilteredProducts}
              />
            ) : null}
          </View>
          {isListLoading ? (
            <View style={{flex: 1}}>{showSwing}</View>
          ) : selectedSubscription == 1 ? (
            <OneTimeProducts
              products={products}
              selectedMeal={selectedMeal}
              selectedSubscription={selectedSubscription}
              navigation={navigation}
            />
          ) : (
            <SubscriptionProducts
              // products={products}
              products={filteredProducts.length ? filteredProducts : products}
              selectedMeal={selectedMeal}
              selectedSubscription={selectedSubscription}
              navigation={navigation}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Products;
