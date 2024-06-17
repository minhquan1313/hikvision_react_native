import BButton from "@/components/Base/BButton";
import BText from "@/components/Base/BText";
import BView, { BViewProps, BViewRef } from "@/components/Base/BView";
import Separator from "@/components/Base/Separator";
import { IControlledComponent } from "@/types/IControlledComponent";
import { cn } from "@/utils/cn";
import { isSameObj } from "@/utils/isSameObj";
import React, { ForwardedRef, forwardRef, memo, useCallback, useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export interface BSelectProps<T = unknown> extends IControlledComponent<T>, BViewProps {
  data: T[];
  title: string;
  style?: BViewProps["style"];
  readOnly?: boolean;
  visible?: boolean;

  expandDirection?: "top" | "bottom";
}

export type BSelectRef<R = unknown> = null;

const _ = <T, R>(props: BSelectProps<T>, ref: ForwardedRef<BSelectRef<R>>) => {
  const {
    //
    title,
    style,
    expandDirection: directionUserProvide,
    data,
    visible: visibleUserProvide = false,
    onChange,
    value,
    ..._props
  } = props;

  const [visible, setVisible] = useState(visibleUserProvide || false);

  const [direction, setDirection] = useState<BSelectProps["expandDirection"]>(directionUserProvide || "bottom");
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number; width: number; height: number }>();

  const r = useRef<BViewRef>(null);

  const calculatePositionOnScreen = useCallback((): (() => void) => {
    const sto = setTimeout(() => {
      if (!r.current) {
        return;
      }

      r.current.measure((...v) => {
        const [width, height, x, y] = v.slice(-4);
        const newXY = { x, y, width, height };

        const isSame = popupPosition
          ? isSameObj({
              first: popupPosition,
              second: newXY,
            })
          : false;

        if (isSame) {
          return;
        }

        setPopupPosition(newXY);
      });
    }, 100);

    return () => {
      clearTimeout(sto);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(popupPosition)]);

  useEffect(() => {
    // calculate popup position on screen
    if (directionUserProvide) return;

    return calculatePositionOnScreen();
  }, [calculatePositionOnScreen, directionUserProvide]);

  useEffect(() => {
    // calculate if it should render up or bottom depend on position on screen
    if (directionUserProvide || !popupPosition) return;
    let windowH = Dimensions.get("window").height;

    const isYOutOfView = popupPosition.y + popupPosition.height > windowH;
    // console.log(popupPosition);
    // console.log(`~🤖 BSelect 🤖~ `, { isYOutOfView, windowH });

    if (isYOutOfView) {
      setDirection((direction) => (direction === "bottom" ? "top" : "bottom"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directionUserProvide, JSON.stringify(popupPosition)]);

  return (
    <BView
      style={style}
      {..._props}
    >
      <BText className="mx-3 mb-1">{title}</BText>

      <BView
        className={cn("rounded-lg border border-light-border dark:border-dark-border", {
          "bg-light-card dark:bg-dark-card": !_props.readOnly,
          "bg-dark-text dark:bg-light-text ": _props.readOnly,
        })}
      >
        {/* Visible to user */}
        <BButton
          // noStyle
          onPress={() => setVisible(!visible)}
        >
          Visible
        </BButton>

        {/* Backdrop click to hide */}
        <BView></BView>

        {/* Select items popup */}
        <BView
          className={cn(
            "absolute -left-[1] -right-[1]",
            {
              "-bottom-[1]": direction === "top",
              "-top-[1]": direction === "bottom",
            },
            "rounded-lg border border-light-border dark:border-dark-border",
            {
              "bg-light-card dark:bg-dark-card": !_props.readOnly,
              "bg-dark-text dark:bg-light-text ": _props.readOnly,
            },
          )}
          style={{
            pointerEvents: visible ? "auto" : "box-none",
            zIndex: visible ? 1 : -1,
            opacity: visible ? 1 : 0,
          }}
          onLayout={() => calculatePositionOnScreen()}
          ref={r}
        >
          <FlatList
            enabled={visible}
            data={Array(44).fill("Popup")}
            keyExtractor={(v, i) => String(i)}
            renderItem={({ item, index }) => (
              <BButton
                noBg
                onPress={() => {
                  console.log(`press`);

                  setVisible(!visible);
                }}
              >
                <BText key={index}>
                  {item} {index}
                </BText>
              </BButton>
            )}
            ItemSeparatorComponent={Separator}
            style={{
              maxHeight: 200,
            }}
          />
          {!visible && <BView className="absolute bottom-0 left-0 right-0 top-0 bg-red-300" />}
        </BView>
      </BView>
    </BView>
  );
};

const BSelect = memo(forwardRef(_)) as typeof _;

export default BSelect;
