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

class Details extends Component {
  render() {
    var details = this.props.navigation.state.params.details
    return(
      <View>
        <Image source={{uri: details.image_url }} style={{width: 300, height: 300}} />
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 30}}>{details.name}</Text>
          <Text style={{fontSize: 30, color: '#606060'}}>{details.price}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 18, color: 'orange'}}>{details.rating}</Text>
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
