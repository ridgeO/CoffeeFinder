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

class Results extends Component {
  static navigationOptions = {
    title: 'Coffee Near You'
  }

  constructor(props) {
    super(props);
    var navResults = this.props.navigation.state.params.yelpResults;
    this.state = {
      results : navResults
    }
  }

  renderRow(item) {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        style={{flex: 1}}
        onPress={() => this.goToDetails(item)}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item.image_url}} style={styles.resultThumbnail}/>
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 25}}>{item.name}</Text>
            <Text style={{fontSize: 20}}>{item.price}</Text>
            <View style={{flexDirection: 'row'}}>
              <StarRating disabled={true} maxStars={5} rating={item.rating} starSize={20} starColor={'orange'}/>
              <Text style={{fontSize: 20, color: '#1E90FF'}}>({item.review_count})</Text>
            </View>
            <View>
              <Text style={{fontSize: 20}}>{Math.round(item.distance/1609.34*100)/100} mi</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  goToDetails(params) {
    this.props.navigation.navigate('Details', {details: params});
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <FlatList
        style={{marginLeft: 0}}
        data={this.state.results}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (this.renderRow(item))}
      />
      </View>
    )
  }
}

export default Results;
