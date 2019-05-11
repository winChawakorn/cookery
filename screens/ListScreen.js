import React from 'react'
import {
  FlatList,
  StatusBar,
  View
} from 'react-native'
import { Divider, ListItem, List } from 'react-native-elements'
import firebase from '../firebase'
import styled from 'styled-components'
import { Bars } from 'react-native-loader'
import logo from '../assets/images/logo.png'
import Dimensions from 'Dimensions'

const { height } = Dimensions.get('window')

const ScrollView = styled.ScrollView`
  flex: 1;
  backgroundColor: #fff;
`

const Logo = styled.Image`
    resizeMode: contain;
    height: 200;
    marginBottom: 10;
`

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Cooking list',
  }

  state = {
    data: [],
    loading: true,
  }

  componentDidMount = () => {
    StatusBar.setBarStyle('default')
    firebase.database().ref('users').once('value', snapshots => snapshots.forEach(snapshot => {
      const user = snapshot.val()
      if (user.email === firebase.auth().currentUser.email) {
        const data = []
        user.list.forEach(id => {
          firebase.database().ref(`meals/${id}`).on('value', snapshot => {
            data.push(snapshot.val())
            if (user.list.indexOf(id) + 1 === user.list.length)
              this.setState({
                data, loading: false
              })
          })
        })
      }
    }))
  }

  render() {
    const { data } = this.state
    return (
      <ScrollView>
        {this.state.loading ? <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: (height / 2) - 320,
        }}>
          <Logo source={logo} style={{ height: 200 }} />
          <Bars size={60} color="#7c7c7c" />
        </View>
          : <FlatList
            data={data}
            renderItem={
              ({ item }) => (
                <ListItem
                  title={item.strMeal}
                  subtitle={Object.keys(item).reduce((prev, cur) => cur.includes('strIngredient') && item[cur] ? `${prev ? prev + ', ' : ''} ${item[cur]}` : prev, '')}
                  leftAvatar={{
                    rounded: false,
                    style: { height: 80, width: 80 },
                    source: { uri: item.strMealThumb }
                  }}
                  containerStyle={{ borderWidth: 0.5 }}
                  onPress={() => this.props.navigation.navigate('Detail', data[data.indexOf(item)])}
                  chevron
                />
              )}
            keyExtractor={item => item.strMeal}
          />
        }
      </ScrollView>
    )
  }
}
