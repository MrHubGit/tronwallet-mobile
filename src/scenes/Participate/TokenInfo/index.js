import React, { PureComponent } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'
import moment from 'moment'

import NavigationHeader from '../../../components/Navigation/Header'
import { BoldInfoRow, RegularInfoRow, SmallRegInfoRow } from '../../../components/KeyPairInfoRow'
import { Colors } from '../../../components/DesignSystem'
import { WhiteLabelText, PercentageView, DividerSpacer } from '../Elements'
import ButtonGradient from '../../../components/ButtonGradient'
import * as Utils from '../../../components/Utils'
import { ONE_TRX } from '../../../services/client'
import tl from '../../../utils/i18n'

class TokenInfo extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavigationHeader
        title={tl.t('participate.tokenInfo')}
        onBack={() => navigation.goBack()}
      />
    )
  })

  render () {
    const {
      name,
      price,
      issuedPercentage,
      issued,
      totalSupply,
      startTime,
      endTime,
      description,
      transaction,
      ownerAddress,
      trxNum,
      num,
      abbr,
      block
    } = this.props.navigation.state.params.item
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        <ScrollView>
          <Utils.Content paddingVertical='small' vertical>
            <Utils.View align='center'>
              <WhiteLabelText label={abbr} />
            </Utils.View>
            <Utils.View flex={1} paddingLeft='medium'>
              <Utils.Text font='bold' size='average'>{name}</Utils.Text>
              <Utils.View paddingY='small'>
                <Utils.SectionTitle small>{tl.t('participate.pricePerToken')}</Utils.SectionTitle>
                <Utils.View height={5} />
                <Utils.Text>{`${price / ONE_TRX} TRX`}</Utils.Text>
              </Utils.View>
              <Utils.Row align='center' justify='space-between'>
                <PercentageView>
                  <Utils.SectionTitle small>{tl.t('participate.percentage')}</Utils.SectionTitle>
                  <Utils.View height={5} />
                  <ProgressBar
                    progress={Math.round(issuedPercentage) / 100}
                    borderWidth={0}
                    height={3}
                    width={180}
                    color={Colors.confirmed}
                    unfilledColor={Colors.dusk}
                  />
                </PercentageView>
                <Utils.BoldText>{Math.round(issuedPercentage)}%</Utils.BoldText>
              </Utils.Row>
              <Utils.View height={8} />
              <ButtonGradient
                text={tl.t('participate.button.buyNow').toUpperCase()}
                onPress={() => {}}
                size='medium'
                full
              />
            </Utils.View>
          </Utils.Content>
          <DividerSpacer size='big' marginX='large' />
          <BoldInfoRow pairs={[
            { key: tl.t('participate.issued'), value: issued },
            { key: tl.t('participate.totalSupply'), value: totalSupply }]}
          />
          <DividerSpacer size='medium' marginX='large' />
          <SmallRegInfoRow pairs={[
            { key: tl.t('participate.startTime'), value: moment(startTime).format('DD/MM/YYYY hh:mm A') },
            { key: tl.t('participate.endTime'), value: moment(endTime).format('DD/MM/YYYY hh:mm A') }]}
          />
          <DividerSpacer size='medium' marginX='large' />
          <RegularInfoRow pairs={[
            { key: tl.t('participate.description'), value: description }]}
          />
          <DividerSpacer size='medium' marginX='large' />
          <RegularInfoRow pairs={[
            { key: tl.t('participate.transaction'), value: transaction }]}
          />
          <DividerSpacer size='medium' marginX='large' />
          <RegularInfoRow pairs={[
            { key: tl.t('participate.ownerAddress'), value: ownerAddress }]}
          />
          <DividerSpacer size='medium' marginX='large' />
          <BoldInfoRow pairs={[
            { key: tl.t('participate.trxNum'), value: trxNum },
            { key: tl.t('participate.num'), value: num },
            { key: tl.t('participate.block'), value: block }]}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default TokenInfo
