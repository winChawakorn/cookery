import React from 'react'
import styled from 'styled-components'
import firebase from '../firebase'

const ScrollView = styled.ScrollView`
    flex: 1;
    paddingTop: 15;
    backgroundColor: #fff;
`

const Title = styled.Text`
  margin: auto;
  fontSize: 25;
  fontFamily: 'Verdana';
`

const Container = styled.View`
  paddingLeft: 20;
  paddingRight: 20;
  paddingTop: 10;
  paddingBottom: 40;
`

const SectionTitle = styled.Text`
  margin: auto;
  marginTop: 20;
  fontSize: 18;
`

const Hr = styled.View`
  height: 1;
  width: 70%;
  margin: auto;
  marginTop: 10;
  backgroundColor: #c1c1c1;
`

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  }

  componentDidMount = async () => {
    // Get ingredients
  }

  render() {
    return (
      <ScrollView>
        <Title>Explore cooking idea</Title>
        <Container>
          <SectionTitle>Ingredients</SectionTitle>
          <Hr />
        </Container>
      </ScrollView>
    )
  }
}
