import {AirbnbRating, Rating} from 'react-native-ratings';
import React, {useState} from 'react';

import Colors from 'constants/colors';

const Ratings = ({
  handleRating,
  orderItemId,
  accessToken,
  setRatedOrderItemId,
}) => {
  const [color, setColor] = useState();

  const ratingCompleted = (rating) => {
    handleRating(rating, {orderItemId, accessToken, setRatedOrderItemId});
    switch (rating) {
      case 1:
        setColor(Colors.rating1);
        break;
      case 2:
        setColor(Colors.rating2);
        break;
      case 3:
        setColor(Colors.rating3);
        break;
      case 4:
        setColor(Colors.rating4);
        break;
      case 5:
        setColor(Colors.rating5);
        break;
      default:
        break;
    }
  };

  return (
    // <Rating
    //   type="star"
    //   ratingCount={5}
    //   imageSize={30}
    //   showRating
    //   minValue={1}
    //   onFinishRating={ratingCompleted}
    //   style={{}}
    // />
    <AirbnbRating
      onFinishRating={ratingCompleted}
      defaultRating={0}
      reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great!!']}
      selectedColor={color}
      reviewColor={color}
      // reviewSize
    />
  );
};

export default Ratings;
