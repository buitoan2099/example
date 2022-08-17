import type {NumberProp, SvgProps} from 'react-native-svg';
import {TouchableProps} from 'src/commons/types';

export interface SvgViewProps extends TouchableProps {
  xml: string;
  iconProps?: SvgProps;
  size?: NumberProp;
  width?: NumberProp;
  height?: NumberProp;
}
