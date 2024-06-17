import BButton, { BButtonProps } from "@/components/Base/BButton";
import { buttonIconSize } from "@/constants/buttonIconConst";
import { useButtonIconColor } from "@/hooks/useButtonIconColor";
import { Entypo } from "@expo/vector-icons";
import { forwardRef, memo } from "react";

export interface PlusButtonProps extends BButtonProps {
  //
}

export type PlusButtonRef = null;

const PlusButton = memo(
  forwardRef<PlusButtonRef, PlusButtonProps>(function PlusButton(props, ref) {
    const {
      //

      ..._props
    } = props;

    const color = useButtonIconColor({ disabled: props.disabled });

    return (
      <BButton
        icon={
          <Entypo
            name="circle-with-plus"
            size={buttonIconSize}
            color={color}
          />
        }
        {..._props}
      />
    );
  }),
);

export default PlusButton;
