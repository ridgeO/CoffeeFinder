'use strict';
import React, { Component } from 'react';
import {
  AsyncStorage,
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
    this.state = {
      yelpToken: ''
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
    this.authCheck();
  }

  async authCheck() {
    try {
      const token = await AsyncStorage.getItem('yelpToken');
      if (token !== null) {
        token = JSON.parse(token);
        if (token.expiration > Date.now()) {
          console.log('got it! ' + token.access_token);
          this.setState({
            yelpToken: token.access_token
          })
          console.log(this.state.yelpToken)
        } else {
          console.log('token is expired')
          this.getYelpAuth();
        }
      } else {
        console.log('token is null')
        this.getYelpAuth();
      }
    } catch (error) {
      console.log(error);
    }
  }

  getYelpAuth() {
    console.log(authForm);
    fetch('https://api.yelp.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: authForm
    }).then((response) => response.json())
      .then(async (responseJson) => {
        var access_token = responseJson.access_token;
        var expires_in = responseJson.expires_in;
        var expiration = Date.now() + expires_in;
        console.log('expiration ' + expiration);
        console.log('from auth call ' + access_token);
        var yelpToken = {
          'access_token': access_token,
          'expiration': expiration
        }
        try {
          await AsyncStorage.setItem('yelpToken', JSON.stringify(yelpToken));
          this.setState({
            yelpToken: access_token
          })
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchForCoffee(token) {
    var lat = this.state.position.coords.latitude;
    var lng = this.state.position.coords.longitude;
    console.log('lat/lng ' + lat + ' ' + lng)
    fetch(`https://api.yelp.com/v3/businesses/search?term=coffee&latitude=${lat}&longitude=${lng}&radius=5000&sort_by=distance`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        var businesses = responseJson.businesses;
        console.log(businesses);
        this.goToResults(businesses, token);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  goToResults(results, token) {
    this.props.navigation.navigate('Results', { yelpResults: results, yelpToken: token })
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
          onPress={() => this.searchForCoffee(this.state.yelpToken)}
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
