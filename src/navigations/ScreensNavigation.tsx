import {SCREENS} from './ScreensRouter';
import {TransferData} from 'src/commons/types';
import {navigate} from './NavigationHelper';

export function navigateToFirst(params?: TransferData) {
  navigate(SCREENS.FIRST.name, params);
}
export function navigateToSecond(params?: TransferData) {
  navigate(SCREENS.SECOND.name, params);
}
