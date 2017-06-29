'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import styles from './styles.js';

class Search extends Component {
  static navigationOptions = {
    title: 'Search',
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headLine}>
          Where is my Coffee?
        </Text>
        <TouchableHighlight
          underlayColor= '#1E90FF'
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>
            Find Coffee
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Search;
