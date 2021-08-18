import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import Colors from 'constants/colors';
import React from 'react';
import {getProducts} from './subscriptionTabs.actions';
import styles from './subscriptionTabs.styles';

const SubscriptionTabs = ({
  selectedMeal,
  subscriptions,
  setProducts,
  setIsListLoading,
  selectedSubscription,
  setSelectedSubscription,
}) => {
  // const [selectedSubscription, setSelectedSubscription] = useState(
  //   subscriptions[0],
  // );

  const handlePress = (subscription) => {
    setSelectedSubscription(subscription);
    getProducts({subscription, setIsListLoading, selectedMeal, setProducts});
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={subscriptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.subscriptionsContainer}>
            <TouchableOpacity
              style={[
                styles.subscriptionsView,
                {
                  backgroundColor:
                    item == selectedSubscription
                      ? 'orange'
                      : Colors.lightGrayish,
                  borderBottomWidth: item == selectedSubscription ? 4 : null,
                  borderBottomColor:
                    item == selectedSubscription ? 'black' : null,
                },
              ]}
              onPress={() => handlePress(item)}>
              {item == 1 ? (
                <Text style={styles.subscriptionsText}>{item} Time Order</Text>
              ) : (
                <Text style={styles.subscriptionsText}>
                  {item} Days{'\n'} Subscription
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
};

export default SubscriptionTabs;
