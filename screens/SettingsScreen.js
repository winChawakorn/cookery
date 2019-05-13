import React from 'react'
import firebase from '../firebase'
import styled from 'styled-components'

const Container = styled.View`

`

const Email = styled.Text`
  fontSize: 20;
  margin: auto;
  paddingTop: 20;
  paddingRight: 20;
  paddingBottom: 20;
  paddingLeft: 20;
`

const Button = styled.TouchableHighlight`
    width: 200;
    backgroundColor: rgb(183, 183, 183);
    ${'' /* borderColor: black; */}
    borderRadius: 10;
    ${'' /* borderWidth: 0.5; */}
    paddingTop: 10;
    paddingBottom: 10;
    paddingLeft: 10;
    paddingRight:10;
    margin: auto;
`

const ButtonText = styled.Text`
  fontSize: 20;
  color: white;
  margin: auto;
`

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
  }

  state = {
    user: firebase.auth().currentUser
  }

  handleLogout = () => {
    firebase.auth().signOut()
    // this.navigation.navigate('Login')
  }

  render() {
    return (
      <Container>
        <Email>{this.state.user.email || null}</Email>
        <Button onPress={() => this.handleLogout()}>
          <ButtonText>Log out</ButtonText>
        </Button>
      </Container>
    )
  }
}
