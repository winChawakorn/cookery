import React from 'react'
import styled from 'styled-components'
import firebase from '../firebase'
import { View, Text } from 'react-native'
import { Bars } from 'react-native-loader'
import Swiper from 'react-native-swiper'

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
  ${'' /* opacity: 0.3; */}
`

const IngredientContainer = styled.View`
  flexDirection: row;
  flexWrap: wrap;
  margin: auto;
  paddingTop: 50;
  paddingBottom: 120;
`

const IngredientImage = styled.Image`
  height: 80;
  width: 80;
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

  selected = []
  pages = []
  emptyPages = []

  getIngredientList = () => {
    if (this.pages.length > 0)
      return (
        <Swiper
          height="auto"
          onIndexChanged={index => {
            if (!this.emptyPages[index])
              this.emptyPages[index] = this.pages[index]
            if (index + 1 < this.pages.length && !this.emptyPages[index + 1])
              this.emptyPages[index + 1] = this.pages[index + 1]
          }}
        >
          {this.emptyPages}
        </Swiper>
      )
    console.log('here')
    const { ingredients, selectedIngredients } = this.state
    if (!ingredients) return null
    let i = 0
    let ingredientViews = []
    while (true) {
      const ingredient = ingredients[i]
      // const isSelected = selectedIngredients.find(ingredient2 => ingredient2.strIngredient === ingredient.strIngredient)
      ingredientViews.push(
        <Ingredient
          key={i}
          onPress={() => {
            // const _selectedIngredients = selectedIngredients
            // if (isSelected) {
            //   const index = selectedIngredients.indexOf(isSelected)
            //   console.log('removing', index)
            //   console.log('before', _selectedIngredients)
            //   _selectedIngredients.splice(index, 1)
            //   console.log('after', _selectedIngredients)
            // }
            // else
            //   _selectedIngredients.push(ingredient)
            // this.setState({ selectedIngredients: _selectedIngredients })
            this.setState({ selectedIngredients: [...selectedIngredients, ingredient] })
            // this.selected = [...this.selected, ingredient]
            // console.log(this.selected)
          }}
        >
          <IngredientImage source={{ uri: ingredient.image.replace('.png', '-Small.png') }} />
          <IngredientLabel>{ingredient.strIngredient}</IngredientLabel>
          {this.selected.find(ingredient2 => ingredient2.strIngredient === ingredient.strIngredient) ?
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>SELECTED</Text>
            </View>
            : null
          }
        </Ingredient>
      )
      i++
      if (i % 20 === 0) {
        this.pages.push(<IngredientContainer key={i}>{ingredientViews}</IngredientContainer>)
        ingredientViews = []
      }
      if (i >= ingredients.length) {
        this.pages.push(<IngredientContainer key={i}>{ingredientViews}</IngredientContainer>)
        break;
      }
    }
    this.emptyPages = this.pages.map(() => null)
    this.emptyPages[0] = this.pages[0]
    return (
      <Swiper
        height="auto"
        onIndexChanged={index => {
          if (!this.emptyPages[index])
            this.emptyPages[index] = this.pages[index]
          if (index + 1 < this.pages.length && !this.emptyPages[index + 1])
            this.emptyPages[index + 1] = this.pages[index + 1]
        }}
      >
        {this.emptyPages}
        {/* {this.pages} */}
      </Swiper>
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
          {/* <Pages containerStyle={{ flex: 1 }}>
                <View style={{ height: 100, backgroundColor: 'red' }} />
                <View style={{ height: 100, backgroundColor: 'green' }} />
                <View style={{ flex: 1, backgroundColor: 'blue' }} />
              </Pages> */}
        </Container>
      </ScrollView>
    )
  }
}
