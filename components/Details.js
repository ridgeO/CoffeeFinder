'use strict';
import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';
import styles from './styles.js';
import StarRating from 'react-native-star-rating';

class Details extends Component {
  render() {
    var details = this.props.navigation.state.params.details
    return(
      <View>
        <Image source={{uri: details.image_url }} style={{width: 400, height: 400}} />
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 30}}>{details.name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 30, color: '#606060'}}>{details.price}</Text>
          <Text style={{fontSize: 30, color: '#606060'}}>{Math.round(details.distance/1609.34*100)/100} mi</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 18, color: 'orange'}}>{details.rating}</Text>
          <StarRating disabled={true} maxStars={5} rating={details.rating} starSize={18} starColor={'orange'}/>
          <Text style={{fontSize: 18, color: '#1E90FF'}}>({details.review_count})</Text>
        </View>
        <Text style={{fontSize: 18}}>{details.location.address1}</Text>
        <Text style={{fontSize: 18}}>{details.location.city}, {details.location.state} {details.location.zip_code}</Text>
        <Text style={{fontSize: 18}}>{details.display_phone}</Text>
      </View>
    )
  }
}

export default Details;
