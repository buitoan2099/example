import React, {RefObject, useRef} from 'react';
import {BottomSheetView} from './BottomSheetView';
import type {BottomSheetProps} from './Types';

let refs: RefObject<BottomSheetView>[] = [];

function addNewRef(newRef: BottomSheetView) {
  refs.push({
    current: newRef,
  });
}
/**
 * Removes the passed in ref from the file-level refs array using a strict equality check.
 *
 * @param oldRef the exact ref object to remove from the refs array.
 */
function removeOldRef(oldRef?: BottomSheetView) {
  refs = refs.filter(r => r.current !== oldRef);
}
export function BottomSheet(props: BottomSheetProps) {
  const btSheetRef = useRef<BottomSheetView>();
  /*
    This must use `useCallback` to ensure the ref doesn't get set to null and then a new ref every render.
    Failure to do so will cause whichever Toast *renders or re-renders* last to be the instance that is used,
    rather than being the Toast that was *mounted* last.
  */
  const setRef = React.useCallback((ref?: BottomSheetView | null) => {
    // Since we know there's a ref, we'll update `refs` to use it.
    if (ref) {
      // store the ref in this toast instance to be able to remove it from the array later when the ref becomes null.
      btSheetRef.current = ref;
      addNewRef(ref);
    } else {
      // remove the this toast's ref, wherever it is in the array.
      removeOldRef(btSheetRef?.current);
    }
  }, []);
  return <BottomSheetView ref={setRef} {...props} />;
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}

BottomSheet.setContentView = () => {
  getRef()?.setContentView();
};

BottomSheet.show = (contentView?: JSX.Element, props?: BottomSheetProps) => {
  getRef()?.show(contentView, props);
};
BottomSheet.close = () => {
  getRef()?.close();
};
