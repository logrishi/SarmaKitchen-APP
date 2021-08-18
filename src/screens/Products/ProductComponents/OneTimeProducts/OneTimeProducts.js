import {FlatList, Image, Text, View} from 'react-native';
import {calcHeight, calcWidth} from 'constants/deviceConfig';

import ButtonCounter from '../ButtonCounter';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {image_url} from 'constants/url';
import styles from './oneTimeProducts.styles';

const OneTimeProducts = ({
  products,
  selectedMeal,
  selectedSubscription,
  navigation,
}) => {
  const handleUI = (item) => {
    let uiToShow = [];

    if ('size' in item.details) {
      for (var i in item.details.size) {
        uiToShow.push(
          <View style={styles.cardView} key={item.details.size[i]}>
            <View style={styles.nameView}>
              {item.is_veg ? (
                <FontAwesome5
                  name="dot-circle"
                  color="green"
                  style={styles.isVegIcon}
                  size={calcHeight(1.5)}
                />
              ) : (
                <FontAwesome5
                  name="dot-circle"
                  color="red"
                  style={styles.isVegIcon}
                  size={calcHeight(1.5)}
                />
              )}
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
            {item.details.size[i] ? (
              <Text style={styles.nameText}>({item.details.size[i]})</Text>
            ) : null}
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${image_url}/${item.image}`,
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            {'notes' in item.details ? (
              <View style={styles.notesView}>
                <Text style={styles.notesText}>{item.details.notes[i]}</Text>
              </View>
            ) : null}

            {/* <Text>₹ {item.price}</Text> */}
            {/* <MyButton title="ADD" style={styles.btn} /> */}
            <ButtonCounter
              id={item.id}
              name={item.name}
              image={item.image}
              is_veg={item.is_veg}
              description={item.description}
              notes={'notes' in item.details ? item.details.notes[i] : null}
              size={'size' in item.details ? item.details.size[i] : null}
              price={item.details.price[i]}
              selectedMeal={selectedMeal}
              selectedSubscription={selectedSubscription}
            />
          </View>,
        );
      }
      return uiToShow;
    } else {
      return (
        <View style={styles.cardView}>
          <View style={styles.nameView}>
            {item.is_veg ? (
              <FontAwesome5
                name="dot-circle"
                color="green"
                style={styles.isVegIcon}
                size={calcHeight(1.5)}
              />
            ) : (
              <FontAwesome5
                name="dot-circle"
                color="red"
                style={styles.isVegIcon}
                size={calcHeight(1.5)}
              />
            )}
            <Text style={styles.nameText}>{item.name}</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `${image_url}/${item.image}`,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.descriptionView}>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>

          {/* <Text>₹ {item.price}</Text> */}
          {/* <MyButton title="ADD" style={styles.btn} /> */}
          <ButtonCounter
            id={item.id}
            name={item.name}
            image={item.image}
            is_veg={item.is_veg}
            description={item.description}
            price={item.details.price}
            selectedMeal={selectedMeal}
            selectedSubscription={selectedSubscription}
          />
        </View>
      );
    }
  };

  return (
    <View
      style={[
        styles.flatlistContainer,
        {
          alignItems: products.length == 1 ? 'flex-start' : 'center',
          marginHorizontal: products.length == 1 ? calcWidth(2) : null,
        },
      ]}>
      <FlatList
        data={products}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.container}>{handleUI(item)}</View>
        )}
        keyExtractor={(item) => item.name.toString()}
      />
    </View>
  );
};

export default OneTimeProducts;
