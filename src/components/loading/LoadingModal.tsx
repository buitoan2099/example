import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import {Dimensions, StyleSheet, View, LayoutAnimation} from 'react-native';
import Modal from 'react-native-modal';
import {LoadingRef, LoadingType} from './Types';
import createStyles from './styles';
import {Bounce} from 'react-native-animated-spinkit';
import {DeviceUtils, vs} from '@utils';
import {useColor, useStyleSheet} from '@hooks';
import {ColorType} from '@commons';
import Text from '@components/text/Text';

export const LoadingView = memo(
  forwardRef((props: LoadingType, ref: Ref<LoadingRef>) => {
    const styleSheet = useStyleSheet(createStyles);
    const color = useColor() as ColorType;
    const {isShow} = props;
    const modalRef = useRef<Modal>(null);
    const propRef = useRef<LoadingType>(props);
    const [isVisible, setVisible] = useState<boolean>();
    const {height} = Dimensions.get('window');
    const heightModal = height + DeviceUtils.getStatusBarHeight();
    const dataProps = useRef<LoadingType>();

    useEffect(() => {
      if (isShow !== null && isShow !== undefined) {
        setVisible(isShow);
      }
      LayoutAnimation.easeInEaseOut();
    }, [isShow]);

    const show = useCallback((newProps?: LoadingType) => {
      dataProps.current = newProps;
      setVisible(true);
    }, []);

    const close = useCallback(() => {
      setVisible(false);
    }, []);

    useImperativeHandle(
      ref,
      useCallback(() => ({show, close}), [show, close]),
    );

    return (
      <Modal
        isVisible={isVisible}
        ref={modalRef}
        {...propRef.current}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={400}
        animationOutTiming={200}
        statusBarTranslucent
        useNativeDriverForBackdrop
        backdropOpacity={0.6}
        coverScreen={false}
        deviceHeight={heightModal}>
        <View style={styles.stContainLogo}>
          <Bounce
            size={vs(100)}
            color={color.colorEB2D4B}
            style={{height: vs(100), width: vs(100), position: 'absolute'}}
          />

          {/* <View style={styleSheet.styleViewLogo}>
            <ImageSvg
              id={'logo'}
              xml={ImagesSvg.logo}
              width={vs(50)}
              height={vs(50)}
            />
          </View> */}
          <Text style={styleSheet.styleText}>{'unit.please_wait'}</Text>
        </View>
      </Modal>
    );
  }),
);
LoadingView.displayName = 'LoadingView';
export declare type LoadingView = LoadingRef & LoadingType;

const styles = StyleSheet.create({
  stContainLogo: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
