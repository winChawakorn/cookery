import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import bg from '../assets/images/login-background.jpg'
import styled from 'styled-components'
import logo from '../assets/images/logo-white.png'
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message"
import { Bubbles } from 'react-native-loader'

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
    marginBottom: 10;
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
    marginBottom: 3;
`

const TabButton = styled.TouchableHighlight`
    width: 50%;
`

const TabButtonLabel = styled.Text`
    fontSize: 25;
`

export default class LoginScreen extends Component {
  state = {
    tab: 'login',
    loading: false,
    email: '',
    password: '',
    confirmPassword: '',
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content')
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }

  getInput = (name, placeholder, icon, secureTextEntry) => (
    <Input
      value={this.state[name]}
      onChangeText={value => this.handleChange(name, value)}
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

  showMessage = (title, message, icon) => {
    showMessage({
      message: title,
      description: message,
      backgroundColor: icon === 'danger' ? 'red' : 'green',
      color: 'white',
      icon: icon || 'danger',
      duration: '4000',
      onPress: () => hideMessage()
    })
  }

  handleSignup = () => {
    const { email, password, confirmPassword } = this.state
    if (!email || !password || !confirmPassword) {
      this.showMessage('Error', `Please complete the form.`, 'danger')
      return
    }
    if (password.length < 8 || password.length > 20) {
      this.showMessage('Error', '`Password` must be 8 - 20 characters.', 'danger')
      return
    }
    if (password !== confirmPassword) {
      this.showMessage('Error', '`Password` and `Confirm Password` do not match.', 'danger')
      return
    }
    this.showMessage('Sign up Success!', `Welcome ${email}`, 'success')
    this.setState({ password: '', confirmPassword: '', tab: 'login' })
  }

  handleLogin = () => {
    this.setState({ loading: true })
    // this.props.navigation.navigate('Main')
  }

  render() {
    const { tab, loading } = this.state
    const alignRight = {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }
    return (
      <Container source={bg}>
        <ContainerFilter>
          <FlashMessage position="top" />
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
            {this.getInput('email', 'Email', 'envelope')}
            {this.getInput('password', 'Password', 'lock', true)}
            {tab === 'signup' ? this.getInput('confirmPassword', 'Confirm Password', 'lock', true) : null}
            <SubmitButton disabled={loading} onPress={() => tab === 'login' ? this.handleLogin() : this.handleSignup()}>
              <SubmitButtonLabel>{loading ? <Bubbles size={12} color="white" /> : tab === 'login' ? 'Login' : 'Sign up'}</SubmitButtonLabel>
            </SubmitButton>
          </LoginForm>
        </ContainerFilter>
      </Container>
    )
  }
}
