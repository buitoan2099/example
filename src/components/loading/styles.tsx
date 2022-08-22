import {ColorType, DimensionType} from '@commons';
import {Theme} from '@components/theme/Types';
import {vs} from '@utils';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const createStyles = (theme: Theme) => {
  const color = theme.color as ColorType;
  const dimension = theme.dimension as DimensionType;
  const styles = StyleSheet.create({
    styleViewLogo: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: vs(35),
      backgroundColor: 'white',
      position: 'absolute',
      width: vs(70),
      height: vs(70),
    },
    styleText: {
      position: 'absolute',
      paddingTop: vs(150),
      color: color.white,
      fontSize: vs(20),
      lineHeight: vs(25),
    },
  });

  return styles;
};

export default createStyles;
