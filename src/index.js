import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { WelcomeScreen, ReviewScreen, AuthScreen, DeckScreen, MapScreen, SettingsScreen } from './screens';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
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
              lazy: true,
              swipeEnabled: false,
              animationEnabled: false
            })
          }
        }, {
          lazy: true,
          swipeEnabled: false,
          animationEnabled: false,
          tabBarPosition: 'bottom'
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true,
      swipeEnabled: false
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