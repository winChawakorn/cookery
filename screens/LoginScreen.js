import React, { Component } from 'react'
import { View, ImageBackground, StyleSheet, TouchableHighlight, Text } from 'react-native'
import bg from '../assets/images/login-background.jpg'
import { white } from 'ansi-colors';

export default class LoginScreen extends Component {
  render() {
    return (
      <ImageBackground source={bg} style={styles.container}>
        <View style={styles.form}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Main')} style={styles.button}>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 25,
  }
})
