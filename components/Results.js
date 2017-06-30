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
    var token = this.props.navigation.state.params.yelpToken;
    this.state = {
      results : navResults,
      yelpToken: token
    }
    console.log('Results token ' + this.state.yelpToken)
  }

  renderRow(item) {
    var image = item.image_url || 'https://unsplash.it/200';
    return (
      <TouchableHighlight
        underlayColor="#fff"
        style={{flex: 1}}
        onPress={() => this.goToDetails(item)}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: image}} style={styles.resultThumbnail}/>
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 25}}>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <StarRating disabled={true} maxStars={5} rating={item.rating} starSize={20} starColor={'orange'}/>
              <Text style={{fontSize: 20, color: '#1E90FF'}}>({item.review_count})</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20, marginRight: 10}}>{item.price}</Text>
              <Text style={{fontSize: 20}}>{Math.round(item.distance/1609.34*100)/100} mi</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  goToDetails(params) {
    this.props.navigation.navigate('Details', {details: params, token: this.state.yelpToken});
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
