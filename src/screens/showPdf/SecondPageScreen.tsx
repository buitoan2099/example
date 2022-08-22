import {Observer} from 'mobx-react-lite';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '@components/text/Text';
import {BaseScreen} from '@components/BaseScreen';
import ButtonTitle from '@components/button/ButtonTitle';
import createStyles from './styles';
import {useColor, useDimension, useStyleSheet} from '@hooks';
import {ColorType, DimensionType} from '@commons';
import {HighlightText} from '@components/text/HighlightText';
import {TextInput} from '@components/textInput/TextInput';
import {vs} from '@utils';

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
          text={
            'anh ếm ba fffffffffffffffffffffffffffffffffffffffffffffffffff 4 h anh ẹm fki em'
          }
          keysearch={'êm '}
          highlightColor={color.red}
          textStyle={styles.titleStyle}
          highlightStyle={styles.titleHighlightStyle}
        />
        <TextInput
          isBottomOutline
          secureTextEntrys
          isShowClear
          warning={'ddddđ'}
          isWarning={true}
          label={'dfffdsgfg'}
        />
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
    fontSize: vs(18),
    fontWeight: '700',
    color: 'black',
    marginVertical: vs(8),
  },
});

export const SecondScreenM = memo(SecondScreen);
SecondScreenM.displayName = 'SecondScreen';
