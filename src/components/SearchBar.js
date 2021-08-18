import React from 'react';
import {View, StyleSheet} from 'react-native';

//constants
import {calcWidth, calcHeight} from 'constants/deviceConfig';
import Colors from 'constants/colors';

//fonts
import Fontisto from 'react-native-vector-icons/Fontisto';

//react native elements
import {Input} from 'react-native-elements';

const SearchBar = ({searchTerm, onSearchTermChange, onSearchSubmit, style}) => {
  return (
    <View style={{...styles.bar, ...style}}>
      <Input
        placeholder="Search your favourite food"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchTerm}
        onChangeText={onSearchTermChange}
        onEndEditing={onSearchSubmit}
        inputContainerStyle={{borderBottomWidth: 0}}
        inputStyle={styles.input}
        leftIcon={<Fontisto name="search" size={calcWidth(6)} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    // backgroundColor: Colors.searchBar,
    flexDirection: 'row',
    height: calcHeight(6),
    backgroundColor: Colors.searchBar,
    width: '90%',
    marginTop: calcHeight(1),
    marginHorizontal: calcWidth(4),
    width: calcWidth(92),
    borderRadius: calcWidth(1),
    elevation: 1,
  },
  input: {
    height: calcHeight(6),
    paddingLeft: calcWidth(2),
  },
});

export default React.memo(SearchBar);
