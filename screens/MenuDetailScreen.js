import React from 'react'
import { View, WebView, TouchableHighlight, Text } from 'react-native'
import styled from 'styled-components'
import { showMessage, hideMessage } from "react-native-flash-message"
import { Divider } from 'react-native-elements'
import { Bars } from 'react-native-loader'
import logo from '../assets/images/logo.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from '../firebase'
import Dimensions from 'Dimensions'

const { height } = Dimensions.get('window')

const ScrollView = styled.ScrollView`
  flex: 1;
  backgroundColor: #fff;
  paddingBottom: 10;
`

const Name = styled.Text`
  fontSize: 25;
  fontWeight: bold;
  margin: auto;
  paddingTop: 10;
  paddingBottom: 10;
  paddingRight: 10;
  paddingLeft: 10;
  borderColor: black;
  borderWidth: 2;
`

const Image = styled.Image`
  height: 300; 
  width: 100%;
  margin: auto;
`

const Logo = styled.Image`
    resizeMode: contain;
    height: 200;
    marginBottom: 10;
`

const DetailContainer = styled.View`
  shadowColor: black;
  shadowRadius: 100;
  shadowOpacity: 1;
  paddingTop: 10;
  paddingBottom: 40;
  paddingLeft: 50;
  paddingRight: 50;
  backgroundColor: #fff;
`

const Detail = styled.Text`
  fontSize: 15;
  margin: auto;
  marginTop: 10;
`

const Title = styled.Text`
  fontSize: 18;
  margin: auto;
  marginTop: 20;
  marginBottom: 5;
`

export default class MenuDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.strMeal || 'Explore',
  })

  state = { loading: true, index: 0, meals: [] }

  componentDidMount() {
    const { params } = this.props.navigation.state
    if (params.country || params.ingredients) {
      firebase.database().ref('meals').once('value', snapshots => {
        const meals = Object.values(snapshots.val()).filter(meal => {
          const checkCountry = meal.strArea === params.country || params.country === 'All'
          if (params.ingredients.length <= 0 || !checkCountry)
            return checkCountry
          let checkIngredients = false
          for (let value of Object.values(meal)) {
            if (params.ingredients.includes(value.toLowerCase())) {
              checkIngredients = true
              break
            }
          }
          return checkCountry && checkIngredients
        })
        if (meals) {
          meals.sort(() => Math.random() - 0.5)
          this.setState({ ...meals[0], meals, loading: false })
        } else {
          this.setState({ loading: false })
        }
      })
    } else {
      this.setState({ ...params, loading: false })
    }
  }

  showMessage = (title, message, icon) => {
    showMessage({
      message: title,
      description: message,
      backgroundColor: icon === 'danger' ? 'red' : 'green',
      color: 'white',
      icon: icon || 'danger',
      duration: '5000',
      onPress: () => hideMessage()
    })
  }

  getMealDetail = () => {
    const data = this.state
    if (!data.strMeal && data.loading === false)
      return <Title>There is no menu match your filter. Please try another filter.</Title>
    const ingredients = []
    Object.keys(data).forEach(key => {
      if (key.includes('strIngredient') && data[key])
        ingredients.push(`${data[key.replace('Ingredient', 'Measure')].trim()} of ${data[key]}`)
    })
    const detail = (
      <DetailContainer key={1}>
        <Name>{data.strMeal || ''}</Name>
        {data.strArea ? [<Title key={0}>Country</Title>,
        <Divider key={1} />,
        <Detail key={2}>{data.strArea}</Detail>] : null}
        {data.strTags || data.strCategory ? [<Title key={0}>Category</Title>,
        <Divider key={1} />,
        <Detail key={2}>{data.strTags ? data.strTags.split(',').join(', ') : data.strCategory}</Detail>] : null}
        <Title>Ingredients</Title>
        <Divider />
        <Detail style={{ marginLeft: 0 }}>{ingredients.map(ingredient => `${ingredients.indexOf(ingredient) + 1}.) ${ingredient}\n`)}</Detail>
        {data.strInstructions ? [<Title key={0}>Instructions</Title>,
        <Divider key={1} />,
        <Detail key={2}>{data.strInstructions}</Detail>] : null}
        {data.strYoutube ?
          <WebView
            style={{ height: 300, marginTop: 20 }}
            javaScriptEnabled={true}
            source={{ uri: `https://www.youtube.com/embed/${data.strYoutube.split('?v=')[1]}?rel=0&autoplay=0&showinfo=0&controls=0` }}
          />
          : null}
        {data.strSource ? [<Title key={0}>Source</Title>,
        <Divider key={1} />,
        <Detail key={2} style={{ color: 'blue' }}>{data.strSource}</Detail>] : null}
      </DetailContainer>
    )
    const image = <Image key={0} source={{ uri: data.strMealThumb }} />
    return [image, detail]
  }

  handleNext = () => {
    const { index, meals } = this.state
    if (index + 1 < meals.length)
      this.setState({ index: index + 1, ...meals[index + 1] })
  }

  handleBack = () => {
    const { index, meals } = this.state
    if (index - 1 >= 0)
      this.setState({ index: index - 1, ...meals[index - 1] })
  }

  handleAdd = () => {
    const { index, meals } = this.state
    firebase.database().ref('users').once('value', snapshots => {
      snapshots.forEach(snapshot => {
        const user = snapshot.val()
        if (user.email === firebase.auth().currentUser.email) {
          if (user.list.includes(meals[index].idMeal)) {
            this.showMessage('Cannot repeat', `${meals[index].strMeal} is already in your list.`, 'danger')
            return
          }
          snapshot.ref.set({ ...user, list: [...user.list, meals[index].idMeal] })
          this.showMessage('Success', `${meals[index].strMeal} was added to your list.`, 'success')
        }
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          {this.state.loading ? <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: (height / 2) - 320,
          }}>
            <Logo source={logo} style={{ height: 200 }} />
            <Bars size={60} color="#7c7c7c" />
          </View> : this.getMealDetail()}
        </ScrollView>
        {this.state.meals.length > 0 ?
          <View style={{ position: 'absolute', bottom: 5, right: 0, left: 0, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableHighlight
              style={{ width: 55 }}
              onPress={this.handleAdd}
            >
              <Icon
                name="plus-circle"
                size={60}
                color='#38b53a'
              />
            </TouchableHighlight>
          </View> : null}
        {this.state.meals.length > 0 && this.state.index - 1 >= 0 ?
          <TouchableHighlight
            onPress={this.handleBack}
          >
            <Icon
              name="arrow-circle-left"
              size={50}
              color='red'
              style={{ position: 'absolute', bottom: 10, left: 40 }}
            />
          </TouchableHighlight> : null}
        {this.state.meals.length > 0 && this.state.index + 1 < this.state.meals.length ?
          <TouchableHighlight
            style={{ position: 'absolute', bottom: 10, right: 40 }}
            onPress={this.handleNext}
          >
            <Icon
              name="arrow-circle-right"
              size={50}
              color='red'
            />
          </TouchableHighlight> : null}
      </View>
    )
  }
}
