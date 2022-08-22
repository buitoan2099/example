import React from 'react';
import {Image as RNImage, ImageStyle} from 'react-native';
import type {ImageProps} from './Type';
export const Image = (props: ImageProps) => {
  if (props.isHide) {
    return null;
  }
  const {source, style, width, height} = props;
  const styleView = () => {
    return {
      ...(style as ImageStyle),
      width,
      height,
    };
  };
  return <RNImage {...props} source={source} style={styleView()} />;
};

export default Image;
