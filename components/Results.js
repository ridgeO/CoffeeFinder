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

  renderRow(item){
    return (
      <TouchableHighlight
        underlayColor="#fff"
        style={{flex: 1}}
      >
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.image_url}} style={{width: 100, height: 100}}/>
          <View>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            <Text>{item.distance}</Text>
            <Text>{item.rating}</Text>
            <Text>({item.review_count})</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
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
