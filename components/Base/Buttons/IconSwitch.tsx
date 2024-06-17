import { useButtonIconColor } from "@/hooks/useButtonIconColor";
import { forwardRef, memo, useImperativeHandle } from "react";

export interface IconSwitchProps {
  iconList?: JSX.Element[];
  iconIndex?: number;
}

export type IconSwitchRef = null;

const IconSwitch = memo(
  forwardRef<IconSwitchRef, IconSwitchProps>(function IconSwitch(props, ref) {
    const {
      //
      iconList = [],
      iconIndex = 0,

      ..._props
    } = props;
    const color = useButtonIconColor();

    useImperativeHandle(
      ref,
      () => {
        return null;
      },
      [],
    );

    return null;
  }),
);

export default IconSwitch;
