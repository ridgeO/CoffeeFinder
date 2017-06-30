'use strict';
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';
import styles from './styles.js';
import StarRating from 'react-native-star-rating';

class Details extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.details.name
  })

  constructor(props) {
    super(props);
    this.state = {
      reviews : []
    }
  }

  componentDidMount() {
    var id = this.props.navigation.state.params.details.id;
    var token = this.props.navigation.state.params.token;
    console.log('Details token: ' + token);
    this.fetchReviews(token, id)
  }

  fetchReviews(token, businessId) {
    fetch(`https://api.yelp.com/v3/businesses/${businessId}/reviews`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        var yelpReviews = responseJson.reviews;
        this.setState({ reviews: yelpReviews })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderRow(item) {
    var image = item.user.image_url || 'https://unsplash.it/200'
    return(
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 10}}>
        <Image source={{uri: image}} alternat={'No Photo'} style={{width: 150, height: 150, borderRadius: 75, marginBottom: 10}}/>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 25, marginBottom: 10}}>{item.user.name}</Text>
          <StarRating disabled={true} maxStars={5} rating={item.rating} starSize={20} starColor={'orange'}/>
          <Text style={{fontSize: 18, marginTop: 10}}>{item.text}</Text>
        </View>
      </View>
    )
  }

  render() {
    var details = this.props.navigation.state.params.details
    return(
      <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
        <Image source={{uri: details.image_url }} style={{width: 400, height: 400}} />
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 35, marginTop: 10}}>{details.name}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 10}}>
          <StarRating disabled={true} maxStars={5} rating={details.rating} starSize={35} starColor={'orange'}/>
          <Text style={{fontSize: 30, color: '#1E90FF'}}>({details.review_count})</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{fontSize: 30, marginRight: 10, color: '#606060'}}>{details.price}</Text>
          <Text style={{fontSize: 30, color: '#606060'}}>{Math.round(details.distance/1609.34*100)/100} mi</Text>
        </View>
        <Text style={{fontSize: 20, marginTop: 10}}>{details.location.address1}</Text>
        <Text style={{fontSize: 20}}>{details.location.city}, {details.location.state} {details.location.zip_code}</Text>
        <Text style={{fontSize: 20, marginTop: 10}}>{details.display_phone}</Text>
        <FlatList
          style={{marginTop: 10}}
          data={this.state.reviews}
          keyExtractor={(item) => (item.url)}
          renderItem={({item}) => (this.renderRow(item))}
        />
      </ScrollView>
    )
  }
}

export default Details;
