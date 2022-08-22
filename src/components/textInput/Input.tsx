import {Touchable} from '@components/Touchable';
import {useColor, useTranslation} from '@hooks';
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ColorValue,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {InputProps, InputRef, StateType} from './Types';

export const InputFR = memo(
  forwardRef<InputRef, InputProps>((props, ref) => {
    if (props.isHide) {
      return null;
    }
    const colors = useColor();
    const {
      containerStyle,
      containerProps,
      leftElement,
      rightElement,
      id,
      value,
      onChangeText,
      onConvertText,
      onFocus,
      onBlur,
      editable = true,
      isInvalid,
      style,
      borderColors = [
        colors?.borderColor,
        colors?.focusBorderColor as ColorValue,
        colors?.errorBorderColor as ColorValue,
        colors?.disbleBorderColor as ColorValue,
      ] as ColorValue[],
      inputContainerStyle,
      inputContainerProps,
      focusStyle,
      disableStyle,
    } = props;
    const [state, setState] = useState({
      isFocus: false,
      valueInput: value,
    } as StateType);
    const {isFocus, valueInput} = state;
    const inputRef = useRef<TextInput>(null);
    const translation = useTranslation();

    useEffect(() => {
      const setHandleValue = () => {
        if (props.hasOwnProperty('value') && value !== valueInput) {
          handleChangeText(value);
        }
      };
      setHandleValue();
    }, [props, value]);

    const middleContainerStyle = (): ViewStyle => {
      let styleProps = StyleSheet.flatten<ViewStyle>(
        inputContainerStyle as ViewStyle,
      );
      let borderColor = colors?.borderColor as ColorValue;
      if (borderColors instanceof Array) {
        borderColor = borderColors[0] || (colors?.borderColor as ColorValue);
        if (!editable) {
          borderColor =
            borderColors[3] || (colors?.disbleBorderColor as ColorValue);
        } else if (isFocus) {
          if (isInvalid) {
            borderColor =
              borderColors[2] || (colors?.errorBorderColor as ColorValue);
          } else {
            borderColor =
              borderColors[1] || (colors?.focusBorderColor as ColorValue);
          }
        } else if (isInvalid) {
          borderColor =
            borderColors[2] || (colors?.errorBorderColor as ColorValue);
        }
      }
      return {
        ...styles.middleStyle,
        ...styleProps,
        borderColor,
      };
    };

    const inputStyles = (): TextStyle => {
      let styleProps = StyleSheet.flatten<TextStyle>(style as TextStyle);
      let disaStyle = StyleSheet.flatten<TextStyle>([
        style as TextStyle,
        disableStyle as TextStyle,
      ]);
      let focuStyle = StyleSheet.flatten<TextStyle>([
        style as TextStyle,
        focusStyle as TextStyle,
      ]);

      if (!editable) {
        return disaStyle;
      }
      if (isFocus) {
        return focuStyle;
      }
      return styleProps;
    };

    ////////
    const handleChangeText = (newText?: string) => {
      let convertText = newText;
      if (convertText !== valueInput) {
        if (!convertText || convertText.length < 0) {
          inputRef?.current?.clear();
        }
        if (onConvertText) {
          convertText = onConvertText?.({id, data: newText}) as string;
        }
        onChangeText?.({id, data: convertText});
        setState({...state, valueInput: convertText});
      }
    };

    const handleFocus = (
      event: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      onFocus?.(event);
      inputRef?.current?.focus();
      setState({...state, isFocus: true});
    };

    const handleOnBlur = (
      event: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      onBlur?.(event);
      inputRef?.current?.blur();
      setState({...state, isFocus: false});
    };
    ///////
    const setValue = (newValue: string) => {
      if (newValue !== valueInput) {
        handleChangeText(newValue);
      }
    };
    const clear = () => {
      //   DeviceUtils.dismissKeyboard();
      if (valueInput) {
        inputRef?.current?.clear();
      }
      setState({...state, valueInput: ''});
    };
    const focus = () => {
      return inputRef?.current?.focus();
    };
    const isFocused = () => {
      return inputRef?.current?.isFocused();
    };
    const blur = () => {
      return inputRef?.current?.blur();
    };
    /////
    useImperativeHandle(ref, () => ({
      setValue,
      clear,
      blur,
      focus,
      isFocused,
      currentValue: valueInput,
    }));

    return (
      <View
        {...containerProps}
        style={{...styles.container, ...(containerStyle as ViewStyle)}}>
        <>
          <Touchable
            {...inputContainerProps}
            onPress={props.onPress}
            id={props.id}
            style={containerStyle}
            pressableStyle={middleContainerStyle()}>
            {leftElement}
            <TextInput
              ref={inputRef}
              underlineColorAndroid="transparent"
              allowFontScaling={false}
              {...(props as TextInputProps)}
              value={valueInput}
              placeholder={
                props.placeholder ? translation(props.placeholder) : ''
              }
              style={[styles.textInput, inputStyles()]}
              onChangeText={handleChangeText}
              onFocus={handleFocus}
              onBlur={handleOnBlur}
            />
            {rightElement}
          </Touchable>
        </>
      </View>
    );
  }),
);

// function areEqual(prevProps: InputProps, nextProps: InputProps) {
//   /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
//   return prevProps.value === nextProps.value;
// }

const styles = StyleSheet.create({
  container: {},
  textInput: {
    flex: 1,
    height: '100%',
    color: 'black',
  },
  middleStyle: {
    padding: 0,
    flexDirection: 'row',
    alignSelf: 'stretch',
    // alignContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#345',
    justifyContent: 'center',
  },
});

export const Input = memo(InputFR);
Input.displayName = 'Input';
