import {IconsSvg} from '@assets/icons/IconsSvg';
import {ColorType} from '@commons';
import {SvgView} from '@components/svg/SvgView';
import Text from '@components/text/Text';
import {Theme} from '@components/theme/Types';
import {useColor, useTranslation, useStyleSheet} from '@hooks';
import {s, vs} from '@utils';
import DeviceUtils from '@utils/DeviceUtils';

import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {BasePopupModalRef, BasePopupModalType} from './Types';

const {height, width} = Dimensions.get('window');
export const PopupModelView = memo(
  forwardRef((props: BasePopupModalType, ref: Ref<BasePopupModalRef>) => {
    const color = useColor() as ColorType;
    const language = useTranslation();
    const styles = useStyleSheet(createStyles);
    const modalRef = useRef<Modal>(null);
    const propRef = useRef<BasePopupModalType>(props);
    const [isVisible, setVisible] = useState<boolean>();
    const dataProps = useRef<BasePopupModalType>();
    const heightModal = height + DeviceUtils.getStatusBarHeight();
    const show = useCallback((newProps?: BasePopupModalType) => {
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
        onBackdropPress={dataProps.current?.overLayClose ? close : undefined}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        {...propRef.current}
        statusBarTranslucent
        useNativeDriverForBackdrop
        backdropOpacity={0.6}
        deviceHeight={heightModal}
        coverScreen={false}>
        <View style={{...styles.container, ...dataProps.current?.styleModel}}>
          <View style={styles.titleContainer}>
            {dataProps.current?.title ? (
              <Text style={[styles.title, dataProps.current?.titleStyle]}>
                {dataProps.current?.title}
              </Text>
            ) : (
              <></>
            )}
            {dataProps.current?.closeModal ? (
              <SvgView
                onPress={close}
                xml={IconsSvg.close}
                iconProps={{
                  width: s(25),
                  height: s(25),
                  color: dataProps.current.colorClose ?? color.black,
                }}
              />
            ) : (
              <></>
            )}
          </View>
          {typeof dataProps.current?.children === 'string' ? (
            <Text style={[styles.content, dataProps.current?.contentStyle]}>
              {language(dataProps.current?.children)}
            </Text>
          ) : dataProps.current?.isScroll ? (
            <ScrollView>{dataProps.current?.children}</ScrollView>
          ) : (
            <View>{dataProps.current?.children}</View>
          )}
          <View style={styles.buttonContainer}>
            {dataProps.current?.subButtonTitle ? (
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: color.colorADAFAE,
                    marginRight: vs(12),
                  },
                  dataProps.current?.subButtonStyle,
                ]}
                onPress={close}>
                <Text
                  style={[
                    styles.btTitStyle,
                    dataProps.current?.subButtonStyle,
                  ]}>
                  {language(dataProps.current?.subButtonTitle)}
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {dataProps.current?.mainButtonTitle ? (
              <TouchableOpacity
                style={[
                  styles.button,
                  {backgroundColor: color.primary},
                  dataProps.current?.mainButtonStyle,
                ]}
                onPress={dataProps.current?.onPress}>
                <Text
                  style={[
                    styles.btTitStyle,
                    dataProps.current?.mainButtonStyle,
                  ]}>
                  {language(dataProps.current?.mainButtonTitle)}
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      </Modal>
    );
  }),
);

const createStyles = (theme: Theme) => {
  const color = theme.color as ColorType;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.white,
      minWidth: width - vs(50),
      minHeight: height / 4,
      paddingHorizontal: vs(12),
      paddingTop: vs(23),
      paddingBottom: vs(9),
      borderRadius: vs(6),
      alignSelf: 'center',
    },
    title: {
      fontSize: vs(18),
      fontWeight: 'bold',
      flex: 1,
      color: color.black,
      textAlign: 'center',
    },
    distance: {
      width: vs(13),
    },
    dummyView: {
      width: vs(20),
      height: vs(20),
    },
    button: {
      flex: 1,
      height: vs(39),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: vs(6),
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioButton: {
      flexDirection: 'row',
    },
    btTitStyle: {
      color: color.white,
      fontSize: vs(18),
      fontWeight: '400',
    },
    content: {
      color: color.color575757,
      fontSize: vs(15),
      fontWeight: '400',
      lineHeight: vs(15.23),
      marginTop: vs(30),
      marginBottom: vs(23),
      textAlign: 'center',
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vs(16),
    },
  });
  return styles;
};
PopupModelView.displayName = 'PopupModelView';
export declare type PopupModelView = BasePopupModalRef & BasePopupModalType;
