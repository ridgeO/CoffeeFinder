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

  constructor(props) {
    super(props);
    this.lattitude = '';
    this.longitude = '';
    this.state = {
      yelpResults: {
        businesses: [
          { name : '' }
        ]
      }
    }
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ position });
        console.log(this.state.position.coords)
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
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
