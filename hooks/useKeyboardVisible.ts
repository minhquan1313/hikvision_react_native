import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export function useKeyboardVisible() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyBoardHeight, setKeyBoardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      setKeyBoardHeight(Keyboard.metrics()?.height || 0);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      setKeyBoardHeight(0);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return { isKeyboardVisible, keyBoardHeight };
}
