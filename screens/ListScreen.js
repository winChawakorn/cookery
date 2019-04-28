import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'

export default class ListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>List screen</Text>
          <Button onPress={() => this.props.navigation.navigate('Detail')} title="More detail" />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
})