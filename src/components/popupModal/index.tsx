import React, {RefObject, useRef} from 'react';
import {PopupModelView} from './PopupModal';
import {BasePopupModalType} from './Types';
export * from './PopupModal';
export * from './Types';
let refs: RefObject<PopupModelView>[] = [];

function addNewRef(newRef: PopupModelView) {
  refs.push({
    current: newRef,
  });
}
function removeOldRef(oldRef?: PopupModelView) {
  refs = refs.filter(r => r.current !== oldRef);
}
export function PopupModal(props: BasePopupModalType) {
  const ModalRef = useRef<PopupModelView>();
  const setRef = React.useCallback((ref?: PopupModelView | null) => {
    if (ref) {
      ModalRef.current = ref;
      addNewRef(ref);
    } else {
      removeOldRef(ModalRef?.current);
    }
  }, []);
  return <PopupModelView ref={setRef} {...props} />;
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}
PopupModal.show = (props?: BasePopupModalType) => {
  getRef()?.show(props);
};
PopupModal.close = () => {
  getRef()?.close();
};
