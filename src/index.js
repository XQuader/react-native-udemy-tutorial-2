import React from 'react';
import { Notifications } from 'expo';
import { StyleSheet, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { WelcomeScreen, ReviewScreen, AuthScreen, DeckScreen, MapScreen, SettingsScreen } from './screens';
import registerForNotifications from './services/PushNotifications';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener(notification => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          notification.data.text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

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
          tabBarPosition: 'bottom',
          tabBarOptions: {
            showIcon: true,
            iconStyle: {
              width: 30,
              height: 30
            },
            labelStyle: {
              fontSize: 12
            }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true,
      animationEnabled: false,
      swipeEnabled: false,
      backBehavior: 'none'
    });

    return (
      <View style={styles.container}>
        <MainNavigator/>
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