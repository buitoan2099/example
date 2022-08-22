/* eslint-disable react/prop-types */
import React, {RefObject, useRef} from 'react';
import {LoadingView} from './LoadingModal';
import {LoadingType} from './Types';
export * from './LoadingModal';
export * from './Types';

let refs: RefObject<LoadingView>[] = [];

function addNewRef(newRef: LoadingView) {
  refs.push({
    current: newRef,
  });
}
function removeOldRef(oldRef?: LoadingView) {
  refs = refs.filter(r => r.current !== oldRef);
}
export function LoadingModal(props: LoadingType) {
  const LoadingRef = useRef<LoadingView>();
  const setRef = React.useCallback((ref: LoadingView) => {
    // Since we know there's a ref, we'll update `refs` to use it.
    if (ref) {
      LoadingRef.current = ref;
      addNewRef(ref);
    } else {
      // remove the this toast's ref, wherever it is in the array.
      removeOldRef(LoadingRef?.current);
    }
  }, []);

  return <LoadingView ref={setRef} {...props} />;
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}
LoadingModal.show = (props?: LoadingType) => {
  getRef()?.show(props);
};
LoadingModal.close = () => {
  getRef()?.close();
};
