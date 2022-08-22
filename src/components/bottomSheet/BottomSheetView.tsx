import React, {
  forwardRef,
  isValidElement,
  memo,
  ReactNode,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Modalize} from 'react-native-modalize';
import type {BottomSheetProps, BottomSheetRef} from './Types';

export const BottomSheetView = memo(
  forwardRef((props: BottomSheetProps, ref: Ref<BottomSheetRef>) => {
    const {children} = props;
    const [isVisible, setVisible] = useState<boolean>();
    const sheetRef = useRef<Modalize>(null);
    const propRef = useRef<BottomSheetProps>(props);
    const contentViewRef = useRef<ReactNode>();

    const show = useCallback(
      (contentView?: JSX.Element, newProps?: BottomSheetProps) => {
        if (newProps) {
          propRef.current = {...props, ...newProps};
        }
        if (contentView && isValidElement(contentView)) {
          contentViewRef.current = contentView;
        } else {
          contentViewRef.current = children;
        }

        if (contentViewRef.current) {
          propRef.current = {
            ...propRef.current,
            children:
              propRef.current.flatListProps ||
              propRef.current.sectionListProps ||
              propRef.current.scrollViewProps
                ? null
                : contentViewRef.current,
          };
        }
        if (propRef.current) {
          setVisible(() => {
            sheetRef.current?.open();
            return !isVisible;
          });
        }
      },
      [children, props, isVisible],
    );

    const setContentView = useCallback(() => {
      sheetRef.current?.open();
    }, []);

    const close = useCallback(() => {
      propRef.current = props;
      sheetRef?.current?.close();
    }, [props]);

    useImperativeHandle(
      ref,
      useCallback(
        () => ({show, close, setContentView}),
        [show, close, setContentView],
      ),
    );
    ////

    const onClosed = () => {
      propRef.current = props;
    };

    ///////////
    return (
      <Modalize
        // withHandle={true}
        ref={sheetRef}
        adjustToContentHeight
        onClosed={onClosed}
        modalStyle={{
          shadowColor: '#000',
          shadowOffset: {width: 2, height: 8},
          shadowOpacity: 0.45,
          shadowRadius: 12,
        }}
        {...propRef.current}
      />
    );
  }),
);
BottomSheetView.displayName = 'BottomSheetView';
export declare type BottomSheetView = BottomSheetRef & BottomSheetProps;
