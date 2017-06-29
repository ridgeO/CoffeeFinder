'use strict';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Search from './components/Search.js';
import Results from './components/Results.js';

const RootNavigator = StackNavigator(
  {
    Search: { name: 'Search', screen: Search },
    Results: { name: 'Results', screen: Results }
  },
  { headerMode: 'screen' }
)

AppRegistry.registerComponent('CoffeeFinder', () => RootNavigator);
