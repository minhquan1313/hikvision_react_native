import { ForwardedRef, forwardRef, memo, useImperativeHandle } from "react";
import { Text } from "react-native";

export interface BSelectItemProps {
  value?: string;
  label?: string;
}

export type BSelectItemRef = null;

const _ = (props: BSelectItemProps, ref: ForwardedRef<BSelectItemRef>) => {
  const {
    //

    ..._props
  } = props;

  useImperativeHandle(
    ref,
    () => {
      return null;
    },
    [],
  );

  return (
    <Text
      //
      {..._props}
    >
      {/*  */}
      BSelectItem
    </Text>
  );
};

const BSelectItem = memo(forwardRef(_));

export default BSelectItem;
