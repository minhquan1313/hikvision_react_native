import BKeyboardDisPress from "@/components/Base/BKeyboardDisPress";
import { useCustomColor } from "@/hooks/useCustomColor";
import { RChildren } from "@/types/RChildren";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps, BottomSheetProps } from "@gorhom/bottom-sheet";
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface BBottomSheetProps extends Omit<BottomSheetProps, "children">, RChildren {
  visible?: boolean;
  // snapPoints: Required<BottomSheetProps["snapPoints"]>;
  autoHeight?: boolean;
}

export type BBottomSheetRef = BottomSheetModal;

const BBottomSheet = memo(
  forwardRef<BBottomSheetRef, BBottomSheetProps>(function BBottomSheet(props, ref) {
    const {
      //
      onClose,
      visible = true,
      snapPoints,
      children,
      ..._props
    } = props;

    const { card: background, "text-alt": alt } = useCustomColor();
    const { top } = useSafeAreaInsets();
    const bottomSheetRef = useRef<BBottomSheetRef>(null);
    const lastIndexRef = useRef(0);
    const indexRef = useRef(0);

    // const { forceUpdate } = useBottomBarAndroid({ color: background, autoUpdate: false });

    const handleSheetChanges = useCallback((index: number) => {
      lastIndexRef.current = indexRef.current;
      indexRef.current = index;

      // setTimeout(() => {
      // lastIndexRef.current = indexRef.current;
      // }, 1000);
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return bottomSheetRef.current!;
      },
      [],
    );
    const onPress = useCallback(() => {
      // if (!Keyboard.isVisible()) return;
      // bottomSheetRef.current?.snapToIndex(lastIndexRef.current);
    }, []);
    const BackDrop = useMemo<BottomSheetModalProps["backdropComponent"]>(
      () =>
        function backDrop(props) {
          return (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              onPress={onClose}
            />
          );
        },
      [onClose],
    );
    useEffect(() => {
      if (visible) {
        bottomSheetRef.current?.present?.();
        bottomSheetRef.current?.snapToIndex?.(0);
      } else {
        // bottomSheetRef.current?.forceClose();
        bottomSheetRef.current?.close();
      }
    }, [visible]);

    return (
      <BottomSheetModal
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        backgroundStyle={useMemo(() => ({ backgroundColor: background }), [background])}
        handleIndicatorStyle={useMemo(() => ({ backgroundColor: alt }), [alt])}
        topInset={top}
        enablePanDownToClose={false}
        index={visible ? 0 : -1}
        style={styles.f}
        ref={bottomSheetRef}
        onDismiss={onClose}
        // keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        backdropComponent={BackDrop}
        {..._props}
      >
        <BKeyboardDisPress
          className="flex-1"
          onPress={onPress}
        >
          {children}
        </BKeyboardDisPress>
      </BottomSheetModal>
    );
  }),
);

const styles = StyleSheet.create({
  f: {
    flex: 1,
  },
});

export default BBottomSheet;
