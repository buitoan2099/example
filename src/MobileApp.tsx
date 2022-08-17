import React, {memo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {i18next} from './assets';
import MobileProvider from './components/mobileProvider/MobileProvider';
import {themeInit} from './components/theme';

interface MobileApp {
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

export const MobileApp = memo((props: MobileApp) => {
  const {children} = props;
  return (
    <MobileProvider i18next={i18next} theme={themeInit}>
      {children}
    </MobileProvider>
  );
});

MobileApp.displayName = 'MobileApp';
