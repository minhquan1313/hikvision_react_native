import BButton, { BButtonProps } from "@/components/Base/BButton";
import { useButtonIconColor } from "@/hooks/useButtonIconColor";
import { Entypo } from "@expo/vector-icons";

export interface PlusButtonProps extends BButtonProps {
  //
}

function PlusButton(props: PlusButtonProps) {
  const {
    //

    ..._props
  } = props;
  const color = useButtonIconColor();

  return (
    <BButton
      icon={
        <Entypo
          name="circle-with-plus"
          size={28}
          color={color}
        />
      }
      {..._props}
    />
  );
}

export default PlusButton;
