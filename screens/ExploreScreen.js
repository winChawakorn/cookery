import React from 'react'
import styled from 'styled-components'
import firebase from '../firebase'
import { View, Text, Picker, StatusBar } from 'react-native'
import { Bars } from 'react-native-loader'
import { Pages } from 'react-native-pages'
import { Input } from 'react-native-elements'
import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/FontAwesome'

const { height } = Dimensions.get('window')

const ScrollView = styled.ScrollView`
    flex: 1;
    paddingTop: 15;
    backgroundColor: #fff;
`

const Title = styled.Text`
  margin: auto;
  fontSize: 25;
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
  paddingLeft: 5;
  paddingRight: 5;
`

const IngredientContainer = styled.View`
  flexDirection: row;
  flexWrap: wrap;
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

const SearchButton = styled.TouchableHighlight`
  width: 60%;
  marginLeft: 20%;
  marginRight: 20%;
  backgroundColor: #848484;
  paddingTop: 10;
  paddingBottom: 10;
  paddingLeft: 10;
  paddingRight:10;
  borderRadius: 5;
  marginTop: 5;
  justifyContent: center;
  alignItems: center;
`
const ExploreButton = styled.TouchableHighlight`
  width: 80%;
  margin: auto;
  backgroundColor: #3a85ff;
  paddingTop: 10;
  paddingBottom: 10;
  paddingLeft: 10;
  paddingRight:10;
  borderRadius: 5;
  marginTop: 5;
  justifyContent: center;
  alignItems: center;
`

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  }

  state = {
    loadingIngredients: true,
    ingredients: [],
    filteredIngredients: [],
    selectedIngredients: [],
    searchterm: '',
    countries: ['All', 'American', 'British', 'Canadian', 'Chinese', 'Dutch', 'Egyptian', 'French', 'Greek', 'Indian', 'Irish', 'Italian', 'Jamaican', 'Japanese', 'Kenyan', 'Malaysian', 'Mexican', 'Moroccan', 'Russian', 'Spanish', 'Thai', 'Unknown', 'Vietnamese'],
    country: 'All',
  }

  componentDidMount = () => {
    StatusBar.setBarStyle('default')
    firebase.database().ref('ingredients').once('value', snapshots => {
      const ingredients = Object.values(snapshots.val())
      this.setState({
        ingredients,
        filteredIngredients: ingredients,
        loadingIngredients: false,
      })
    })
  }

  getIngredientList = () => {
    const { filteredIngredients, selectedIngredients } = this.state
    if (!filteredIngredients) return null
    let i = 0
    const pages = []
    let ingredientViews = []
    if (filteredIngredients.length > 0) {
      while (true) {
        const ingredient = filteredIngredients[i]
        if (!ingredient)
          continue
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
        if (i >= filteredIngredients.length) {
          if (i % 20 !== 0)
            pages.push(<IngredientContainer key={i}>{ingredientViews}</IngredientContainer>)
          break;
        }
      }
    }
    // const emptyPages = pages.map((page) => <View key={pages.indexOf(page)} />)
    // emptyPages[0] = pages[0]
    return ([
      <View key={0}>
        <Input
          key={'00'}
          value={this.state.searchterm}
          onChangeText={searchterm => this.setState({ searchterm })}
          inputContainerStyle={{
            width: '60%',
            borderColor: 'black',
            borderRadius: 5,
            borderWidth: 1,
            marginLeft: '20%',
            marginRight: '20%',
            marginTop: 20,
          }}
          inputStyle={{
            color: 'black',
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 15,
          }}
          placeholder="Search Ingredients"
          leftIcon={
            <Icon
              name="search"
              size={24}
              color='black'
            />}
        />
        <SearchButton key={'01'} onPress={() => this.handleSearchtermChange()}><Text key={'010'} style={{ color: 'white' }}>Search</Text></SearchButton>
      </View>,
      pages.length > 0 ?
        pages.length > 1 ? <Pages
          key={1}
          containerStyle={{ height: height + 100 }}
          indicatorColor="black"
          startPage={0}
          ref={ref => this.page = ref}
        >
          {pages}
        </Pages>
          : pages
        : <Text key={'10'} style={{ margin: 'auto', marginTop: 20 }}>No result</Text>
    ])
  }

  clearSelected = () => {
    this.setState({ selectedIngredients: [], searchterm: '' })
    this.handleSearchtermChange()
  }

  handleSearchtermChange = () => {
    const { ingredients, searchterm } = this.state
    const filteredIngredients = ingredients.filter(ingredient => ingredient.strIngredient.toLowerCase().includes(searchterm.toLowerCase()))
    this.setState({ filteredIngredients })
    if (this.page && filteredIngredients)
      this.page.scrollToPage(0)
  }

  render() {
    const { country, countries, loadingIngredients, selectedIngredients } = this.state
    return (
      <ScrollView>
        <Title>Explore cooking idea</Title>
        <Container>
          <SectionTitle>Ingredients</SectionTitle>
          <Hr />
          {loadingIngredients ?
            <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
              <Bars size={60} color="#7c7c7c" /></View> :
            this.getIngredientList()
          }
          {selectedIngredients.length > 0 ?
            [<SectionTitle key={0}>Selected Ingredients</SectionTitle>,
            <Hr key={1} />]
            : null}
          {selectedIngredients.length > 0 ?
            <ExploreButton style={{ backgroundColor: 'red', width: '50%' }} onPress={() => this.clearSelected()}>
              <Text style={{ color: 'white', fontSize: 20 }}>Clear ingredients</Text>
            </ExploreButton>
            : null}
          {selectedIngredients.map(ingredient => (
            <IngredientLabel style={{ fontSize: 18, marginTop: 5, marginBottom: 5 }} key={ingredient.strIngredient}>{selectedIngredients.indexOf(ingredient) + 1}.) {ingredient.strIngredient}</IngredientLabel>
          ))}
          <SectionTitle>Country</SectionTitle>
          <Hr />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Picker
              selectedValue={country}
              style={{ height: 50, width: 200, marginBottom: 180 }}
              itemStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 5 }}
              onValueChange={(itemValue) =>
                this.setState({ country: itemValue })
              }
            >
              {countries.map(country => <Picker.Item key={country} label={country} value={country} />)}
            </Picker>
          </View>
          <Hr />
          <ExploreButton onPress={() => this.props.navigation.navigate('Detail', { country, ingredients: selectedIngredients.map(ingredient => ingredient.strIngredient.toLowerCase()) })}>
            <Text style={{ color: 'white', fontSize: 20 }}>Explore!</Text>
          </ExploreButton>
        </Container>
      </ScrollView>
    )
  }
}
