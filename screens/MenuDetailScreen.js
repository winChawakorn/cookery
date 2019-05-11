import React from 'react'
import { View, WebView } from 'react-native'
import styled from 'styled-components'
import FlashMessage, { showMessage } from "react-native-flash-message"
import { Divider } from 'react-native-elements'
import { Bars } from 'react-native-loader'
import logo from '../assets/images/logo.png'
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
    title: navigation.state.params.strMeal,
  })

  state = {
    loading: true
  }

  componentDidMount() {
    this.setState({ ...this.props.navigation.state.params, loading: false })
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
        <Detail key={2}>{data.strArea}</Detail>] : ''}
        {data.strTags || data.strCategory ? [<Title key={0}>Category</Title>,
        <Divider key={1} />,
        <Detail key={2}>{data.strTags ? data.strTags.split(',').join(', ') : data.strCategory}</Detail>] : ''}
        <Title>Ingredients</Title>
        <Divider />
        <Detail style={{ marginLeft: 0 }}>{ingredients.map(ingredient => `${ingredients.indexOf(ingredient) + 1}.) ${ingredient}\n`)}</Detail>
        {data.strInstructions ? [<Title key={0}>Instructions</Title>,
        <Divider key={1} />,
        <Detail key={2}>{data.strInstructions}</Detail>] : ''}
        {data.strYoutube ?
          <WebView
            style={{ height: 300, marginTop: 20 }}
            javaScriptEnabled={true}
            source={{ uri: `https://www.youtube.com/embed/${data.strYoutube.split('?v=')[1]}?rel=0&autoplay=0&showinfo=0&controls=0` }}
          />
          : ''}
        {data.strSource ? [<Title key={0}>Source</Title>,
        <Divider key={1} />,
        <Detail key={2} style={{ color: 'blue' }}>{data.strSource}</Detail>] : ''}
      </DetailContainer>
    )
    const image = <Image key={0} source={{ uri: data.strMealThumb }} />
    return [image, detail]
  }

  render() {
    return (
      <ScrollView>
        <FlashMessage position="top" />
        {this.state.loading ? <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: (height / 2) - 320,
        }}>
          <Logo source={logo} style={{ height: 200 }} />
          <Bars size={60} color="#7c7c7c" />
        </View> : this.getMealDetail()}
      </ScrollView>
    )
  }
}
