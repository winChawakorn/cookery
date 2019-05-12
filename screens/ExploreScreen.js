import React from 'react'
import styled from 'styled-components'
import firebase from '../firebase'
import { View, Text } from 'react-native'
import { Bars } from 'react-native-loader'
import { Pages } from 'react-native-pages'
import Dimensions from 'Dimensions'

const { height } = Dimensions.get('window')

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

const Ingredient = styled.TouchableOpacity`
  margin: auto;
`

const IngredientContainer = styled.View`
  flexDirection: row;
  flexWrap: wrap;
  margin: auto;
  paddingTop: 50;
  paddingBottom: 120;
`

const IngredientImage = styled.Image`
  height: ${height / 11};
  width: ${height / 11};
  margin: auto;
  marginTop: 20;
`

const IngredientLabel = styled.Text`
  margin: auto;
  fontSize: 15;
`

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  }

  state = {
    loadingIngredients: true,
    ingredients: [],
    selectedIngredients: [],
    index: 0,
  }

  componentDidMount = () => {
    firebase.database().ref('ingredients').once('value', snapshots => {
      const ingredients = Object.values(snapshots.val())
      // ingredients.sort((a, b) => a.strIngredient > b.strIngredient ? 1 : -1)
      this.setState({
        ingredients,
        loadingIngredients: false
      })
    })
  }

  getIngredientList = () => {
    const { ingredients, selectedIngredients } = this.state
    console.log('sssss', selectedIngredients)
    if (!ingredients) return null
    let i = 0
    const pages = []
    let ingredientViews = []
    while (true) {
      const ingredient = ingredients[i]
      const isSelected = selectedIngredients.find(ingredient2 => ingredient2.strIngredient === ingredient.strIngredient)
      ingredientViews.push(
        <Ingredient
          key={i}
          onPress={() => {
            const _selectedIngredients = selectedIngredients
            if (isSelected) {
              const index = selectedIngredients.indexOf(isSelected)
              _selectedIngredients.splice(index, 1)
            }
            else
              _selectedIngredients.push(ingredient)
            this.setState({ selectedIngredients: _selectedIngredients })
          }}
        >
          <IngredientImage source={{ uri: ingredient.image.replace('.png', '-Small.png') }} />
          <IngredientLabel>{ingredient.strIngredient}</IngredientLabel>
          {isSelected ?
            <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>SELECTED</Text>
            </View>
            : null
          }
        </Ingredient>
      )
      i++
      if (i % 20 === 0) {
        pages.push(<IngredientContainer key={i}>{ingredientViews}</IngredientContainer>)
        ingredientViews = []
      }
      if (i >= ingredients.length) {
        pages.push(<IngredientContainer key={i}>{ingredientViews}</IngredientContainer>)
        break;
      }
    }
    const emptyPages = pages.map(() => null)
    emptyPages[0] = pages[0]
    return (
      <Pages
        containerStyle={{ height }}
        onScrollEnd={index => {
          if (!emptyPages[index])
            emptyPages[index] = pages[index]
          if (index + 1 < pages.length && !emptyPages[index + 1])
            emptyPages[index + 1] = pages[index + 1]
        }}
        indicatorColor="black"
      >
        {pages}
      </Pages>
    )
  }

  render() {
    return (
      <ScrollView>
        <Title>Explore cooking idea</Title>
        <Container>
          <SectionTitle>Ingredients</SectionTitle>
          <Hr />
          {this.state.loadingIngredients ?
            <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
              <Bars size={60} color="#7c7c7c" /></View> :
            (
              this.getIngredientList()
            )
          }
        </Container>
      </ScrollView>
    )
  }
}
