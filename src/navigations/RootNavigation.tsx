import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SCREENS} from './ScreensRouter';
import {navigationRef, StackOption} from './NavigationHelper';
import {BottomSheet} from '@components/bottomSheet';
import {LoadingModal} from '@components/loading';
import {PopupModal} from '@components/popupModal';

const Stack = createStackNavigator();

export const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={StackOption}
        initialRouteName={SCREENS.SECOND.name}>
        <Stack.Screen
          name={SCREENS.FIRST.name}
          component={SCREENS.FIRST.component}
        />
        <Stack.Screen
          name={SCREENS.SECOND.name}
          component={SCREENS.SECOND.component}
        />
      </Stack.Navigator>
      <PopupModal />
      <BottomSheet />
      <LoadingModal />
    </NavigationContainer>
  );
};
