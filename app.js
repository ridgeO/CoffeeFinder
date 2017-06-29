'use strict';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Search from './components/Search.js';

const RootNavigator = StackNavigator(
  {
    Search: {name: 'Search', screen: Search }
  },
  { headerMode: 'screen' }
)

AppRegistry.registerComponent('CoffeeFinder', () => RootNavigator);
