import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import bg from '../assets/images/login-background.jpg'
import styled from 'styled-components'
import logo from '../assets/images/logo-white.png'

const Container = styled.ImageBackground`
    flex: 1;
    resizeMode: cover;
    justifyContent: center;
    alignItems: center;
`

const Button = styled.TouchableHighlight`
    width: 250;
    borderColor: white;
    borderRadius: 10;
    borderWidth: 1;
    paddingTop: 5;
    paddingBottom: 5;
    paddingLeft: 10;
    paddingRight:10;
`

const ButtonLabel = styled.Text`
    color: white;
    fontSize: 20;
    margin: auto;
`

const LoginForm = styled.View`
    justifyContent: center;
    alignItems: center;
    backgroundColor: rgba(0, 0, 0, 0.5);
    paddingBottom: 20;
    borderRadius: 10;
`

const Logo = styled.Image`
    resizeMode: contain;
    height: 200;
`

export default class LoginScreen extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content')
  }

  getInput = (placeholder, icon, secureTextEntry) => (
    <Input
      inputContainerStyle={{
        width: 250,
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 20,
      }}
      inputStyle={{
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10,
      }}
      secureTextEntry={secureTextEntry || false}
      placeholderTextColor="#cecece"
      placeholder={placeholder}
      leftIcon={
        <Icon
          name={icon}
          size={24}
          color='white'
        />}
    />
  )

  render() {
    return (
      <Container source={bg}>
        <LoginForm>
          <Logo source={logo} />
          {this.getInput('Username', 'user')}
          {this.getInput('Password', 'lock', true)}
          <Button onPress={() => this.props.navigation.navigate('Main')}>
            <ButtonLabel>Login</ButtonLabel>
          </Button>
        </LoginForm>
      </Container>
    )
  }
}
