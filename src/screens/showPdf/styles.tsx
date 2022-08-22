import {vs} from '@utils';
import {StyleSheet} from 'react-native';
import {ColorType} from '../../commons/defines/colors/ColorType';
import {DimensionType} from '../../commons/defines/dimensions';
import {Theme} from '../../components/theme/Types';

const createStyles = (theme: Theme) => {
  const color = theme.color as ColorType;
  const dimension = theme.dimension as DimensionType;
  const styles = StyleSheet.create({
    container: {
      marginTop: vs(12),
    },
    bottomButtonView: {
      width: '100%',
      paddingBottom: vs(16),
      alignSelf: 'center',
      paddingHorizontal: dimension.margin3,
    },
  });

  return styles;
};

export default createStyles;
