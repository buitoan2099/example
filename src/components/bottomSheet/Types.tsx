import type {ModalizeProps} from 'react-native-modalize';

export interface BottomSheetProps extends ModalizeProps {}

export interface BottomSheetRef {
  setContentView: () => void;
  show: (contentView?: JSX.Element, props?: BottomSheetProps) => void;
  close: () => void;
}
