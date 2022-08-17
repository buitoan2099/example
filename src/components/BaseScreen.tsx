import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ImageBackground,
  StatusBar,
  StatusBarStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import React, {memo} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BaseProps, TransferData} from 'src/commons/types';
import {IMAGE_BG} from '@assets';
import {Header, HeaderProps} from './header';
import {goBack} from '@navigations/NavigationHelper';

type BaseScreenProps = BaseProps & {
  title?: React.ReactNode;
  headerProps?: HeaderProps;
  headerStyle?: ViewStyle | TextStyle | ImageStyle;
  contentStyle?: StyleProp<ViewStyle>;
  barStyle?: StatusBarStyle;
  isImageBg?: boolean;
  imageBg?: string;
  isScroll?: boolean;
  rightIcon?: string;
  isBackHide?: boolean;
  onPressRight?: (data?: TransferData) => void;
  onBack?: () => void;
};
export const BaseScreen = memo((props: BaseScreenProps) => {
  if (props.isHide) {
    return null;
  }
  const {
    style,
    title,
    headerStyle,
    isImageBg = false,
    imageBg = IMAGE_BG,
    contentStyle,
    isScroll = true,
    barStyle = 'dark-content',
    headerProps,
    rightIcon,
    isBackHide = false,
    onPressRight,
    onBack,
  } = props;

  const ContentView = () => {
    return isImageBg ? (
      <ImageBackground
        resizeMode="stretch"
        resizeMethod="scale"
        source={imageBg}
        style={[styles.container, style as StyleProp<ViewStyle>]}>
        <Header
          title={title}
          style={headerStyle}
          {...headerProps}
          onGoBack={onBack ? onBack : goBack}
          rightIcon={rightIcon}
          onPressRight={onPressRight}
        />
        {isScroll ? (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // keyboardShouldPersistTaps={'always'}
            contentContainerStyle={[styles.bodyStyle, contentStyle]}
            extraHeight={50}
            // enableOnAndroid={true}
            keyboardOpeningTime={200}>
            {props.children}
          </KeyboardAwareScrollView>
        ) : (
          props.children
        )}
      </ImageBackground>
    ) : (
      <View style={[styles.container, style as StyleProp<ViewStyle>]}>
        <Header
          title={title}
          style={headerStyle}
          {...headerProps}
          onGoBack={onBack ? onBack : goBack}
          rightIcon={rightIcon}
          isHideIconBack={isBackHide}
          onPressRight={onPressRight}
        />

        {isScroll ? (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // keyboardShouldPersistTaps={'always'}
            contentContainerStyle={[styles.bodyStyle, contentStyle]}
            extraHeight={50}
            // enableOnAndroid={true}
            keyboardOpeningTime={200}>
            {props.children}
          </KeyboardAwareScrollView>
        ) : (
          props.children
        )}
      </View>
    );
  };
  return (
    <SafeAreaProvider
      style={{backgroundColor: 'transparent'}}
      initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle={barStyle} />
      {ContentView()}
    </SafeAreaProvider>
  );
});
BaseScreen.displayName = 'BaseScreen';
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    alignSelf: 'center',
    width: '100%',
    flex: 1,
  },
  bodyStyle: {
    // flex: 1,
    flexGrow: 1,
  },
});
