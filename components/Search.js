'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import styles from './styles.js';
import authForm from './YelpConfig.js';

class Search extends Component {
  static navigationOptions = {
    title: 'Search',
    header: null
  }

  constructor(props) {
    super(props);
    this.lattitude = '';
    this.longitude = '';
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

  async fetchData() {
    this.latitude = this.state.position.coords.latitude
    this.longitude = this.state.position.coords.longitude
    console.log(authForm);
    await fetch('https://api.yelp.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: authForm
    }).then((response) => response.json())
      .then((responseJson) => {
        var access_token = responseJson.access_token;
        console.log(access_token);
        fetch(`https://api.yelp.com/v3/businesses/search?term=coffee&latitude=${this.latitude}&longitude=${this.longitude}&radius=5000`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
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
          onPress={() => this.fetchData()}
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
