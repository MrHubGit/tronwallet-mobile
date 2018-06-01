import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import { Auth } from 'aws-amplify'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as Utils from '../../components/Utils'
import { Colors, Spacing } from '../../components/DesignSystem'
import ButtonGradient from '../../components/ButtonGradient'
import { version } from './../../package.json'

class LoginScene extends Component {
  state = {
    email: '',
    password: '',
    signError: null
  }

  componentWillReceiveProps (nextProps) {
    const { navigation } = nextProps
    if (navigation.state.params && navigation.state.params.totpError) {
      this.refs.toast.show('Session expired, try again')
    }
  }

  changeInput = (text, field) => {
    this.setState({
      [field]: text,
      signError: null
    })
  }

  signIn = async () => {
    const { navigation } = this.props
    const { email, password } = this.state
    Keyboard.dismiss()

    this.setState({ loadingSign: true, signError: null })

    try {
      const user = await Auth.signIn(email, password)
      navigation.navigate('ConfirmLogin', { user })
      this.setState({ signError: null, loadingSign: false })
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
        navigation.navigate('ConfirmSignup', { email })
        this.setState({ loadingSign: false })
        return
      }
      if (error && error.message) {
        this.setState({ signError: error.message, loadingSign: false })
      } else {
        this.setState({ signError: error, loadingSign: false })
      }
    }
  }

  _submit = target => {
    const { email, password } = this.state

    if (target === 'email' && !password) {
      this.password.focus()
      return
    }

    if (target === 'password' && !email) {
      this.email.focus()
      return
    }

    if (email && password) {
      return this.signIn()
    }
  }

  renderSubmitButton = () => {
    const { loadingSign } = this.state

    if (loadingSign) {
      return (
        <Utils.Content height={80} justify='center' align='center'>
          <ActivityIndicator size='small' color={Colors.yellow} />
        </Utils.Content>
      )
    }

    return (<ButtonGradient text='SIGN IN' onPress={this.signIn} size='small' />)
  }

  render () {
    const { signError } = this.state
    const ChangedPassword = this.props.navigation.getParam('changedPassword')
    return (
      <KeyboardAvoidingView
        // behavior='padding'
        // keyboardVerticalOffset={150}
        style={{ flex: 1, backgroundColor: Colors.background }}
        enabled
      >
        <KeyboardAwareScrollView>
          <Utils.StatusBar />
          <Utils.Container
            keyboardShouldPersistTaps={'always'}
            keyboardDismissMode='interactive'
          >
            <Utils.Content justify='center' align='center'>
              <Utils.VerticalSpacer size='small' />
              <Image source={require('../../assets/login-circle.png')} />
              <Utils.VerticalSpacer size='small' />
              <Utils.Text size='medium'>
                TRONWALLET
              </Utils.Text>
            </Utils.Content>
            <Utils.FormGroup>
              <Utils.Text size='xsmall' secondary>
                E-MAIL
              </Utils.Text>
              <Utils.FormInput
                innerRef={ref => {
                  this.email = ref
                }}
                underlineColorAndroid='transparent'
                keyboardType='email-address'
                marginBottom={20}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={text => this.changeInput(text, 'email')}
                onSubmitEditing={() => this._submit('email')}
                returnKeyType={'next'}
                padding={Spacing.small}
              />
              <Utils.Text size='xsmall' secondary>
                PASSWORD
              </Utils.Text>
              <Utils.FormInput
                innerRef={ref => {
                  this.password = ref
                }}
                underlineColorAndroid='transparent'
                secureTextEntry
                letterSpacing={10}
                onChangeText={text => this.changeInput(text, 'password')}
                onSubmitEditing={() => this._submit('password')}
                returnKeyType='send'
                padding={Spacing.small}
              />
              {this.renderSubmitButton()}
            </Utils.FormGroup>
            <Utils.Content justify='center' align='center'>
              {ChangedPassword && (
                <Utils.Text size='small' success>
                  Password Changed
                </Utils.Text>
              )}
              <Utils.Error>{signError}</Utils.Error>
              <Utils.Text
                onPress={() => this.props.navigation.navigate('ForgotPassword')}
                size='small'
                font='light'
                secondary
              >
                FORGOT PASSWORD ?
              </Utils.Text>
              <Utils.VerticalSpacer size='large' />
              <Utils.Text size='xsmall' secondary>
                {`v${version}`}
              </Utils.Text>
            </Utils.Content>
            <Toast
              ref='toast'
              position='center'
              fadeInDuration={750}
              fadeOutDuration={1000}
              opacity={0.8}
            />
          </Utils.Container>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default LoginScene
