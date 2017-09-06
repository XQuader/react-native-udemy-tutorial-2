import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import WelcomScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomScreen },
      auth: { screen: AuthScreen },
      mainFlow: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          reviewStack: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            }, {
              lazyLoad: true,
              swipeEnabled: false,
              animationEnabled: false
            })
          }
        }, {
          lazyLoad: true,
          swipeEnabled: false,
          animationEnabled: false,
          tabBarPosition: 'bottom'
        })
      }
    }, {
      lazyLoad: true,
      swipeEnabled: false,
      tabBarPosition: 'bottom'
    });

    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1
  }
});