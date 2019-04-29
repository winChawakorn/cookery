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
`

const ContainerFilter = styled.View`
    justifyContent: center;
    alignItems: center;
    height: 100%;
    width: 100%;
    backgroundColor: rgba(0, 0, 0, 0.4);
`

const SubmitButton = styled.TouchableHighlight`
    width: 300;
    backgroundColor: rgba(183, 183, 183, 0.5);
    borderColor: white;
    borderRadius: 10;
    borderWidth: 1;
    paddingTop: 10;
    paddingBottom: 10;
    paddingLeft: 10;
    paddingRight:10;
`

const SubmitButtonLabel = styled.Text`
    color: white;
    fontSize: 20;
    margin: auto;
`

const LoginForm = styled.View`
    justifyContent: center;
    alignItems: center;
    backgroundColor: rgba(0, 0, 0, 0.5);
    paddingTop: 25;
    paddingBottom: 25;
    paddingRight: 20;
    paddingLeft: 20;
    borderRadius: 10;
`

const Logo = styled.Image`
    resizeMode: contain;
    height: 200;
`

const TabBar = styled.View`
    width: 250;
    height: 25;
    overflow: hidden;
`

const Tab = styled.View`
  backgroundColor: rgba(0, 0, 0, 0.5);
  width: 75;
  height: 75;
  borderRadius: 50;
`

const TabLabelBar = styled.View`
    width: 230;
    flexDirection: row;
    marginBottom: 10;
`

const TabButton = styled.TouchableHighlight`
    width: 50%;
`

const TabButtonLabel = styled.Text`
    fontSize: 25;
`

export default class LoginScreen extends Component {
  state = {
    tab: 'login'
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content')
  }

  getInput = (placeholder, icon, secureTextEntry) => (
    <Input
      inputContainerStyle={{
        width: 300,
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

  handleSubmit = () => {
    if (this.state.tab === 'login') {
      this.props.navigation.navigate('Main')
    } else {

    }
  }

  render() {
    const { tab } = this.state
    const alignRight = {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }
    return (
      <Container source={bg}>
        <ContainerFilter>
          <Logo source={logo} />
          <TabLabelBar>
            <TabButton underlayColor='transparent' onPress={() => this.setState({ tab: 'login' })} >
              <TabButtonLabel style={{ color: tab === 'login' ? 'white' : '#bababa' }}>Login</TabButtonLabel>
            </TabButton>
            <TabButton underlayColor='transparent' onPress={() => this.setState({ tab: 'signup' })} style={{ ...alignRight, marginLeft: 15 }}>
              <TabButtonLabel style={{ color: tab === 'signup' ? 'white' : '#bababa' }}>Sign up</TabButtonLabel>
            </TabButton>
          </TabLabelBar>
          <TabBar style={(tab === 'signup' ? alignRight : {})}>
            <Tab />
          </TabBar>
          <LoginForm>
            {this.getInput('Email', 'envelope')}
            {this.getInput('Password', 'lock', true)}
            {tab === 'signup' ? this.getInput('Confirm Password', 'lock', true) : null}
            <SubmitButton onPress={() => this.handleSubmit()}>
              <SubmitButtonLabel>{tab === 'login' ? 'Login' : 'Sign up'}</SubmitButtonLabel>
            </SubmitButton>
          </LoginForm>
        </ContainerFilter>
      </Container>
    )
  }
}
