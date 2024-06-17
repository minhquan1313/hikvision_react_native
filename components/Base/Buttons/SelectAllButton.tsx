import BButton, { BButtonProps } from "@/components/Base/BButton";
import { buttonIconSize } from "@/constants/buttonIconConst";
import { useButtonIconColor } from "@/hooks/useButtonIconColor";
import { MaterialIcons } from "@expo/vector-icons";
import { forwardRef, memo } from "react";

export interface SelectAllButtonProps extends BButtonProps {
  //
}

export type SelectAllButtonRef = null;

const SelectAllButton = memo(
  forwardRef<SelectAllButtonRef, SelectAllButtonProps>(function SelectAllButton(props, ref) {
    const {
      //

      ..._props
    } = props;

    const color = useButtonIconColor({ disabled: props.disabled });

    return (
      <BButton
        icon={
          <MaterialIcons
            name="select-all"
            size={buttonIconSize}
            color={color}
          />
        }
        {..._props}
      />
    );
  }),
);

export default SelectAllButton;
