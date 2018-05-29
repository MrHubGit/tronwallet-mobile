import * as React from 'react'
import { Dimensions } from 'react-native'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'
import FreezeScreen from '../Freeze'
import SendScreen from '../Send'
import ReceiveScreen from '../Receive'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
}

// const FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#ff4081' } ]} />
// const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />

export default class TransferScene extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'send', title: 'Send' },
      { key: 'receive', title: 'Receive' },
      { key: 'freeze', title: 'Freeze' }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} style={{ backgroundColor: 'black', marginTop: '5%', flex: 0.1 }} />;

  _renderScene = SceneMap({
    send: SendScreen,
    receive: () => <ReceiveScreen {...this.props} />,
    freeze: FreezeScreen
  });

  render () {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
        style={{ backgroundColor: 'black' }}
      />
    )
  }
}
