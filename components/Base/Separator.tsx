import BView, { BViewProps } from "@/components/Base/BView";
import { forwardRef, memo } from "react";

export interface SeparatorProps extends BViewProps {
  //
}

export type SeparatorRef = null;

const Separator = memo(
  forwardRef<SeparatorRef, SeparatorProps>(function Separator(props, ref) {
    const {
      //

      ..._props
    } = props;

    return (
      <BView
        className="h-[1] w-full bg-light-border dark:bg-dark-border"
        {..._props}
      />
    );
  }),
);

export default Separator;
