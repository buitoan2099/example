import {Observer} from 'mobx-react-lite';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '@components/text/Text';
import {BaseScreen} from '@components/BaseScreen';
import ButtonTitle from '@components/button/ButtonTitle';
import {vs} from 'src/commons/types';
import createStyles from './styles';
import {useColor, useDimension, useStyleSheet} from '@hooks';
import {ColorType, DimensionType} from '@commons';
import {HighlightText} from '@components/text/HighlightText';

export const SecondScreen = () => {
  //   const viewModel = FirstViewModel.current;
  const stylesSheet = useStyleSheet(createStyles);
  const color = useColor() as ColorType;
  const dimension = useDimension() as DimensionType;

  const HandleCheck = () => {
    // viewModel.onPressPayBill();
  };

  const headerView = () => {
    return (
      <>
        <Text style={styles.titleStyle}>{'title.choose_to_pay'}</Text>
        <HighlightText
          text={'anh em ba 4 h anh em fki em'}
          keysearch={'em'}
          highlightColor={color.red}
          textStyle={styles.titleStyle}
          highlightStyle={styles.titleHighlightStyle}
        />
        {/* <Text style={styles.titleStyle}>{'title.choose_to_pay'}</Text> */}
        {/* <Text style={styles.titleStyle}>{'title.choose_to_pay'}</Text>
        <View style={stylesSheet.containerView}>
          <RowTextView
            title={'water_bill.bill_number'}
            value={viewModel.billNumber[0]}
            styleTitle={{color: color.white}}
            styleValue={stylesSheet.valueStyle}
          />
          <RowTextView
            title={''}
            value={viewModel.billNumber[1]}
            styleValue={stylesSheet.valueStyle}
            style={{
              paddingTop: vs(0),
            }}
          />
          <RowTextView
            title={'title.period'}
            value={viewModel.period}
            styleTitle={{color: color.white}}
            styleValue={stylesSheet.valueStyle}
          />
          <RowTextView
            title={'mytel_packs.amount_kyats'}
            value={viewModel.amount}
            styleTitle={{color: color.white}}
            styleValue={stylesSheet.valueStyle}
            style={{
              paddingBottom: dimension.padding3,
            }}
          />
        </View> */}
      </>
    );
  };

  return (
    <BaseScreen title={'Second'}>
      <View style={styles.container}>
        <Observer>{() => headerView()}</Observer>
      </View>
      <Observer>
        {() => (
          <View style={stylesSheet.bottomButtonView}>
            <ButtonTitle
              title={'button.check'}
              styleButton={{elevation: vs(1)}}
              onPress={HandleCheck}
            />
          </View>
        )}
      </Observer>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: vs(16),
  },
  titleStyle: {
    fontSize: vs(14),
    fontWeight: '400',
    color: 'black',
    marginVertical: vs(8),
  },
  titleHighlightStyle: {
    fontSize: vs(16),
    fontWeight: '700',
    color: 'black',
    marginVertical: vs(8),
  },
});

export const SecondScreenM = memo(SecondScreen);
SecondScreenM.displayName = 'SecondScreen';
