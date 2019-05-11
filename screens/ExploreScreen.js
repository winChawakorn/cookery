import React from 'react'
import styled from 'styled-components'

const ScrollView = styled.ScrollView`
    flex: 1;
    paddingTop: 15;
    backgroundColor: #fff;
`

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  }

  render() {
    return (
      <ScrollView>

      </ScrollView>
    )
  }
}
