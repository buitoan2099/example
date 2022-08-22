import {
  createNavigationContainerRef,
  StackActions,
  TabActions,
} from '@react-navigation/native';
import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import {DeviceUtils} from '@utils';

export const StackOption: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

export const navigationRef = createNavigationContainerRef();

export function getNavigation(hideKeyboard?: boolean) {
  hideKeyboard && DeviceUtils?.dismissKeyboard();
  return navigationRef;
}

export function getRoute() {
  return getNavigation()?.getCurrentRoute();
}

export function goBack() {
  if (getNavigation().isReady()) {
    getNavigation()?.canGoBack() && getNavigation(true)?.goBack();
  }
}

export function popToTop() {
  if (getNavigation().isReady()) {
    getNavigation()?.canGoBack() &&
      getNavigation(true)?.dispatch(StackActions.popToTop());
  }
}

export function replace(routeName: string, params?: object) {
  getNavigation(true)?.dispatch(StackActions.replace(routeName, params));
}

export function jumpTo(routeName: string) {
  getNavigation(true)?.dispatch(TabActions.jumpTo(routeName));
}

export function navigate(routeName: string, params?: object) {
  // if (getNavigation().isReady()) {
  //   getNavigation(true)?.dispatch(CommonActions.navigate(routeName, params));
  // }
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    getNavigation().navigate(routeName as never, params as never);
  } else {
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }
}
