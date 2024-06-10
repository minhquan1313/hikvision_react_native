import BSafeAreaView from "@/components/Base/BSafeAreaView";
import BView from "@/components/Base/BView";
import { useEffect, useState } from "react";
import { Modal, ModalProps, ScrollView } from "react-native";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export interface BModalProps extends ModalProps {
  //
  delay?: number;

  animationIn?: boolean;
  animationOut?: boolean;
}

function BModal(props: BModalProps) {
  const {
    //
    delay = 300,

    animationIn = true,
    animationOut = true,

    visible: visibleControl,
    children,
    ..._props
  } = props;

  const [visible, setVisible] = useState(visibleControl || false);

  const top = useSharedValue(100);
  const animatedStyle = useAnimatedStyle(() => ({
    top: `${top.value}%`,
  }));

  function hideModal() {
    setVisible(false);
  }

  useEffect(() => {
    if (visibleControl) {
      setVisible(true);

      if (animationIn) {
        top.value = withTiming(0, {
          duration: delay,
          easing: Easing.out(Easing.exp),
        });
      }

      return;
    }

    if (animationOut) {
      top.value = withTiming(
        103,
        {
          duration: delay,
          easing: Easing.out(Easing.quad),
        },
        (finish) => {
          if (!finish) return;

          runOnJS(hideModal)();
        },
      );
    }
  }, [visibleControl]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      {..._props}
    >
      <BSafeAreaView
        withKeyboardOnly
        className="mt-auto rounded-t-3xl"
        // className="absolute bottom-0 left-0 right-0 rounded-t-3xl"
      >
        <ScrollView
          style={{
            overflow: "visible",
          }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            className="rounded-t-3xl border border-b-0 border-light-border bg-light-background dark:border-dark-border dark:bg-dark-background"
            style={[animatedStyle]}
          >
            {children}
          </Animated.View>

          <BView className="absolute left-0 right-0 top-full h-[999px] border border-y-0 border-light-border bg-light-background dark:border-dark-border dark:bg-dark-background" />
        </ScrollView>
      </BSafeAreaView>
    </Modal>
  );
}

export default BModal;
