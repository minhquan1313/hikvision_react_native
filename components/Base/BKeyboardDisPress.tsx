import { forwardRef, memo, useCallback } from "react";
import { GestureResponderEvent, Keyboard, Platform, TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from "react-native";

export interface BKeyboardDisPressProps extends TouchableWithoutFeedbackProps {
  //
}

export type BKeyboardDisPressRef = null;

const BKeyboardDisPress = memo(
  forwardRef<BKeyboardDisPressRef, BKeyboardDisPressProps>(function BKeyboardDisPress(props, ref) {
    const {
      //
      onPress,
      ..._props
    } = props;

    const onPressHandle = useCallback(
      (e: GestureResponderEvent) => {
        Keyboard.dismiss();
        onPress?.(e);
      },
      [onPress],
    );

    if (Platform.OS === "web") return <>{_props.children}</>;

    return (
      <TouchableWithoutFeedback
        onPress={onPressHandle}
        accessible={false}
        {..._props}
      />
    );
  }),
);

export default BKeyboardDisPress;
