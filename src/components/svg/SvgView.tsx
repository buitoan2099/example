import {Touchable} from '@components/Touchable';
import React, {memo} from 'react';
import type {ViewStyle} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {TransferData} from 'src/commons/types';
import type {SvgViewProps} from './Type';
export * from './Type';

export const SvgView = memo((props: SvgViewProps) => {
  if (props.isHide) {
    return null;
  }
  const {id, data, xml, onPress, iconProps} = props;
  const onPressHandler = () => {
    onPress?.({id, data} as TransferData);
  };

  const androidRippleConfig = () => {
    return {
      color: 'white',
      foreground: false,
      // ...android_ripple,
    };
  };

  return (
    <Touchable
      {...props}
      android_ripple={androidRippleConfig()}
      style={{
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        ...(props.style as ViewStyle),
      }}
      pressableStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
      onPress={props.onPress && onPressHandler}>
      {xml ? (
        <SvgXml
          xml={xml}
          override={iconProps ?? {width: 22, height: 22, color: 'white'}}
          onPress={undefined}
        />
      ) : null}
    </Touchable>
  );
});
SvgView.displayName = 'SvgView';
