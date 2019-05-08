import React from 'react'
import {
  FlatList,
  StatusBar,
  Text
} from 'react-native'
import { Divider, ListItem, List } from 'react-native-elements'
// import firebase from '../firebase'
import styled from 'styled-components'
import { Bubbles } from 'react-native-loader'

const Title = styled.Text`
  margin: auto;
  fontSize: 20;
  paddingTop: 20;
  paddingBottom: 20;
`

const Container = styled.View`
  flex: 1;
  backgroundColor: #fff;
`

const ScrollView = styled.ScrollView`
  flex: 1;
  backgroundColor: #fff;
`

export default class ListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    data: [],
    loading: true,
  }

  componentDidMount() {
    StatusBar.setBarStyle('default')
    // fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    //   .then(res => res.json())
    //   .then(res => this.setState({ data: [...this.state.data, ...res.meals], loading: false }))
    //   .catch(error =>
    //     console.log('err', error)
    //   )
    this.setState({
      data: [...this.state.data, {
        "dateModified": null,
        "idMeal": "52865",
        "strArea": "Indian",
        "strCategory": "Vegetarian",
        "strDrinkAlternate": null,
        "strIngredient1": "Sunflower Oil",
        "strIngredient10": "Garam Masala",
        "strIngredient11": "Coriander",
        "strIngredient12": "Naan Bread",
        "strIngredient13": "",
        "strIngredient14": "",
        "strIngredient15": "",
        "strIngredient16": "",
        "strIngredient17": "",
        "strIngredient18": "",
        "strIngredient19": "",
        "strIngredient2": "Paneer",
        "strIngredient20": "",
        "strIngredient3": "Ginger",
        "strIngredient4": "Cumin",
        "strIngredient5": "Turmeric",
        "strIngredient6": "Coriander",
        "strIngredient7": "Green Chilli",
        "strIngredient8": "Tomato",
        "strIngredient9": "Peas",
        "strInstructions": "Heat the oil in a frying pan over high heat until it’s shimmering hot. Add the paneer, then turn the heat down a little. Fry until it starts to brown at the edges, then turn it over and brown on each side – the paneer will brown faster than you think, so don’t walk away. Remove the paneer from the pan and drain on kitchen paper. Put the ginger, cumin, turmeric, ground coriander and chilli in the pan, and fry everything for 1 min.Add the tomatoes, mashing them with the back of a spoon and simmer everything for 5 mins until the sauce smells fragrant.Add a splash of water if it’s too thick.Season well.Add the peas and simmer for a further 2 mins, then stir in the paneer and sprinkle over the garam masala.Divide between two bowls, top with coriander leaves and serve with naan bread, roti or rice.",
        "strMeal": "Matar Paneer",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg",
        "strMeasure1": "1 tbls",
        "strMeasure10": "1 tsp ",
        "strMeasure11": "Small bunch",
        "strMeasure12": "to serve",
        "strMeasure13": "",
        "strMeasure14": "",
        "strMeasure15": "",
        "strMeasure16": "",
        "strMeasure17": "",
        "strMeasure18": "",
        "strMeasure19": "",
        "strMeasure2": "225g",
        "strMeasure20": "",
        "strMeasure3": "2",
        "strMeasure4": "1 tsp ",
        "strMeasure5": "1 tsp ",
        "strMeasure6": "1 tsp ",
        "strMeasure7": "1",
        "strMeasure8": "4 large",
        "strMeasure9": "150g",
        "strSource": "https://www.bbcgoodfood.com/recipes/matar-paneer",
        "strTags": "Curry,Vegetarian",
        "strYoutube": "https://www.youtube.com/watch?v=wlseYNqwLNs",
      }], loading: false
    })
  }

  render() {
    return (
      <Container>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          <Title>Cooking List</Title>
          <Divider />
          {this.state.loading ? <Bubbles size={10} color="black" />
            : <FlatList
              data={this.state.data}
              renderItem={
                ({ item }) => (
                  <ListItem
                    title={item.strMeal}
                    subtitle={Object.keys(item).reduce((prev, cur) => { console.log(prev); return cur.includes('strIngredient') && item[cur] ? `${prev ? prev + ', ' : ''} ${item[cur]}` : prev }, '')}
                    leftAvatar={{
                      rounded: false,
                      style: { height: 80, width: 80 },
                      source: { uri: item.strMealThumb }
                    }}
                    containerStyle={{ borderWidth: 0.5 }}
                    onPress={() => this.props.navigation.navigate('Detail')}
                    chevron
                  />
                )}
              keyExtractor={item => item.strMeal}
            />
          }
        </ScrollView>
      </Container>
    )
  }
}
