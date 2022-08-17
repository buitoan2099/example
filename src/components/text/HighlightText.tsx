import React, {memo} from 'react';
import {useTranslation} from '@hooks';
import {TransParam} from 'src/commons/types';
import {Text} from './Text';
import {HighlightTextProps, textFormProps, TextProps} from './Types';

export default function HighlightTextM(props: HighlightTextProps) {
  if (props.isHide) {
    return null;
  }
  const textStyle = props?.textStyle;
  const hightlightTextStyle = props?.highlightStyle;
  const title = props.text;
  const keysearch = props.keysearch;
  const translation = useTranslation();

  const handleOnPress = () => {
    props?.onPress?.({} as TransParam);
  };

  const handleOnHightlightPress = () => {
    props?.onPressHightLight?.({} as TransParam);
  };

  const getValue = () => {
    let result = [] as textFormProps[];
    let data = translation(title);
    let key = translation(keysearch);
    let i = 0;
    while (i < data.length) {
      let pos = data.indexOf(key);
      if (pos > -1) {
        result = [...result, {text: data.substring(i, pos)}];
        result = [
          ...result,
          {
            text: key,
            isHighlight: true,
          },
        ];
        data = data.substring(pos + key.length, data.length);
      } else {
        result = [...result, {text: data.substring(i, data.length)}];
        i = data.length;
      }
    }
    return result;
  };

  const getValueString = () => {
    return getValue().map((val: textFormProps, index: number) => {
      if (val.isHighlight) {
        return (
          <Text
            key={index.toString()}
            onPress={handleOnHightlightPress}
            style={{
              ...textStyle,
              ...hightlightTextStyle,
              color: props.highlightColor,
            }}>
            {val.text}
          </Text>
        );
      } else {
        return (
          <Text key={index.toString()} style={textStyle}>
            {val.text}
          </Text>
        );
      }
    });
  };

  return <Text onPress={handleOnPress}>{getValueString()}</Text>;
}
export const HighlightText = memo(HighlightTextM);
HighlightText.displayName = 'HighlightText';
