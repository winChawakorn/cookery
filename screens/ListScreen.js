import React from 'react'
import {
  FlatList,
  StatusBar,
  View,
  Text,
} from 'react-native'
import { Divider, ListItem, List } from 'react-native-elements'
import firebase from '../firebase'
import styled from 'styled-components'
import { Bars } from 'react-native-loader'
import Swipeout from 'react-native-swipeout'
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

const ExploreButton = styled.TouchableHighlight`
    width: 300;
    backgroundColor: #3a85ff;
    borderColor: white;
    borderRadius: 10;
    borderWidth: 1;
    paddingTop: 10;
    paddingBottom: 10;
    paddingLeft: 10;
    paddingRight:10;
`

const ExploreButtonLabel = styled.Text`
    color: white;
    fontSize: 20;
    margin: auto;
`

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Cooking list',
  }

  state = {
    data: [],
    loading: true,
    key: '',
  }

  componentDidMount = () => {
    StatusBar.setBarStyle('default')
    this.fetchList()
    const { fetchList } = this
    firebase.database().ref('users/' + this.state.key).on('value', function (snapshot) {
      fetchList()
    })
  }

  fetchList = () => {
    this.setState({ loading: true })
    firebase.database().ref('users').once('value', snapshots => snapshots.forEach(snapshot => {
      const user = snapshot.val()
      if (user.email === firebase.auth().currentUser.email) {
        const data = []
        if (!user.list)
          return this.setState({ loading: false, data })
        user.list.forEach(id => {
          firebase.database().ref(`meals/${id}`).on('value', snapshot => {
            data.push(snapshot.val())
            if (user.list.indexOf(id) + 1 === user.list.length)
              this.setState({
                data, loading: false, key: snapshot.key
              })
          })
        })
      }
    }))
  }

  removeItem = async item => {
    await firebase.database().ref('users').once('value', snapshots => snapshots.forEach(snapshot => {
      const user = snapshot.val()
      if (user.email === firebase.auth().currentUser.email) {
        const index = user.list.indexOf(user.list.find(id => id === item.idMeal))
        if (index === -1)
          return
        const _list = user.list
        _list.splice(index, 1)
        snapshot.ref.set({
          ...user,
          list: _list,
        })
      }
    }))
    // this.fetchList()
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
          : this.state.data.length > 0 ? <FlatList
            data={data}
            renderItem={
              ({ item }) => (
                <Swipeout right={[{
                  text: 'Delete',
                  backgroundColor: 'red',
                  color: 'white',
                  onPress: () => {
                    this.removeItem(item)
                  }
                }]}>
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
                </Swipeout>
              )}
            keyExtractor={item => item.strMeal}
          /> :
            <View style={{ margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ margin: 'auto', fontSize: 15, marginTop: 20, marginBottom: 10 }}>Your list is empty. Explore for more menus!</Text>
              <ExploreButton onPress={() => this.props.navigation.navigate('Explore')}>
                <ExploreButtonLabel>Explore</ExploreButtonLabel>
              </ExploreButton>
            </View>
        }
      </ScrollView>
    )
  }
}
