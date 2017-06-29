'use strict';
import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableHighlight
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
      >
        <Text>{item.name}</Text>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
      <FlatList
        data={this.state.results}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (this.renderRow(item))}
      />
      </View>
    )
  }
}

export default Results;
