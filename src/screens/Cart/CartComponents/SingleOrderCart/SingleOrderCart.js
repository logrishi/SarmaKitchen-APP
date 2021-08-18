import {Image, Text, View} from 'react-native';

import ButtonCounter from 'screens/Products/ProductComponents/ButtonCounter';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {calcHeight} from 'constants/deviceConfig';
import {image_url} from 'constants/url';
import styles from './singleOrderCart.styles';

const SingleOrderCart = ({item}) => {
  return (
    <View style={styles.cardView}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `${image_url}/${item.image}`,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.titleContainer}>
          {item.is_veg ? (
            <FontAwesome5
              name="dot-circle"
              color="green"
              style={styles.icon}
              size={calcHeight(1.5)}
            />
          ) : (
            <FontAwesome5
              name="dot-circle"
              color="red"
              style={styles.icon}
              size={calcHeight(1.5)}
            />
          )}
          <Text style={styles.titleText}>
            {item.name}
            {` (${item.selectedMeal})`}
          </Text>
        </View>
        {item.size ? (
          <View style={styles.detailsView}>
            {item.size ? (
              <Text style={styles.sizeText}>{item.size}</Text>
            ) : null}
            {item.notes ? (
              <View style={styles.notesView}>
                <Text style={styles.hifen}>-</Text>
                <Text style={styles.sizeText}>{item.notes}</Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
      <View style={styles.counterContainer}>
        <ButtonCounter
          i
          id={item.id}
          name={item.name}
          image={item.image}
          is_veg={item.is_veg}
          description={item.description}
          notes={item.notes}
          size={item.size}
          price={item.price}
          selectedMeal={item.selectedMeal}
          selectedSubscription={item.selectedSubscription}
        />
      </View>
    </View>
  );
};

export default SingleOrderCart;
