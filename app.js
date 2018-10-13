/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

var QuickActions = require('react-native-quick-actions');
// Add few actions
QuickActions.setShortcutItems([
  {
    type: "Orders", // Required
    title: "See your orders", // Optional, if empty, `type` will be used instead
    subtitle: "See orders you've made",
    icon: "Compose", // Pass any of UIApplicationShortcutIconType<name>
    userInfo: {
      url: "app://orders" // provide custom data, like in-app url you want to open
    }
  }
]);

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    var subscription = DeviceEventEmitter.addListener(
      'quickActionShortcut', (data) => {
        this.setState({ eventListenerAction: data.title });
      }
    );

    QuickActions.popInitialAction().then((data) => {
      if (data) {
        this.setState({ popAction: data.title });
      }
    }).catch(console.error)
  }
  render() {
    const { popAction, eventListenerAction } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Quick Action Test
        </Text>
        <Text style={styles.instructions}>
          Pop Action: {popAction}
        </Text>
        <Text style={styles.instructions}>
          Event Listener Action: {eventListenerAction}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
