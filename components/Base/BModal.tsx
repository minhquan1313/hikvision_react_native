import BSafeAreaView from "@/components/Base/BSafeAreaView";
import BView from "@/components/Base/BView";
import { useEffect, useState } from "react";
import { Modal, ModalProps } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export interface BModalProps extends ModalProps {
  //
  delay?: number;
}

function BModal(props: BModalProps) {
  const {
    //
    delay = 200,

    visible: visibleControl,
    children,
    ..._props
  } = props;

  const [visible, setVisible] = useState(visibleControl || false);

  const top = useSharedValue(100);
  const animatedStyle = useAnimatedStyle(() => ({
    top: `${top.value}%`,
  }));

  useEffect(() => {
    if (visibleControl) {
      setVisible(true);

      top.value = withTiming(0, {
        duration: delay,
        easing: Easing.out(Easing.exp),
      });

      return;
    }
    top.value = withTiming(100, {
      duration: delay,
      easing: Easing.out(Easing.exp),
    });

    const sto = setTimeout(() => {
      setVisible(false);
    }, delay);

    return () => {
      clearTimeout(sto);
    };
  }, [visibleControl]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      //   animationType="slide"
      hardwareAccelerated
      {..._props}
    >
      <BView className="mt-auto">
        <BSafeAreaView>
          <Animated.View
            className="rounded-t-xl1 overflow-hidden bg-slate-700"
            style={animatedStyle}
          >
            {children}
          </Animated.View>
        </BSafeAreaView>
      </BView>
    </Modal>
  );
}

export default BModal;
