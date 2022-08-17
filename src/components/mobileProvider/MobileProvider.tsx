import React, {Fragment} from 'react';
import {StatusBar, View} from 'react-native';
import {I18nextProvider} from 'react-i18next';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {ProviderProps} from './Types';
import {ThemeProvider} from '@components/theme/ThemeProvider';

export const MobileProvider = (props: ProviderProps) => {
  const {children, i18next, theme, backgroundColor = 'white'} = props;
  if (!children) {
    return null;
  }
  return (
    <ThemeProvider initial={theme}>
      <I18nextProvider i18n={i18next}>
        <SafeAreaProvider
          style={{backgroundColor: backgroundColor}}
          initialMetrics={initialWindowMetrics}>
          <StatusBar
            translucent
            backgroundColor={'transparent'}
            barStyle={'light-content'}
            // barStyle={`${
            //   colorScheme === ('light' || true) ? 'dark' : 'light'
            // }-content`}
          />
          {/* <View
            style={{ flexGrow: 1 }}
            onStartShouldSetResponder={DeviceUtils.dismissKeyboard}
          >
            <Fragment>{children}</Fragment>
          </View> */}
          <Fragment>{children}</Fragment>
        </SafeAreaProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default MobileProvider;
