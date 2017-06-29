'use strict';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Search from './components/Search.js';
import Results from './components/Results.js';
import Details from './components/Details.js';

const RootNavigator = StackNavigator(
  {
    Search: { name: 'Search', screen: Search },
    Results: { name: 'Results', screen: Results },
    Details: { name: 'Details', screen: Details }
  },
  { headerMode: 'screen' }
)

AppRegistry.registerComponent('CoffeeFinder', () => RootNavigator);
