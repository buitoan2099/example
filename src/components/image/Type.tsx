import {Key} from 'react';
import {ImageProps as RNImageProps} from 'react-native';
import {BaseProps} from 'src/commons/types';

export interface ImageProps extends RNImageProps, Omit<BaseProps, 'style'> {
  width?: Key;
  height?: Key;
}
