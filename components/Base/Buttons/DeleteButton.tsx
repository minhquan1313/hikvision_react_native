import BButton, { BButtonProps } from "@/components/Base/BButton";
import { buttonIconSize } from "@/constants/buttonIconConst";
import { useButtonIconColor } from "@/hooks/useButtonIconColor";
import { AntDesign } from "@expo/vector-icons";
import { forwardRef, memo } from "react";

export interface DeleteButtonProps extends BButtonProps {
  //
}

export type DeleteButtonRef = null;

const DeleteButton = memo(
  forwardRef<DeleteButtonRef, DeleteButtonProps>(function DeleteButton(props, ref) {
    const {
      //

      ..._props
    } = props;

    const color = useButtonIconColor({ disabled: props.disabled });

    return (
      <BButton
        icon={
          <AntDesign
            name="delete"
            size={buttonIconSize}
            color={color}
          />
        }
        {..._props}
      />
    );
  }),
);

export default DeleteButton;
