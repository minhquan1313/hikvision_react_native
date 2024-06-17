import BView from "@/components/Base/BView";
import { forwardRef, memo } from "react";

export interface CameraSeparatorProps {
  //
}

export type CameraSeparatorRef = null;

const CameraSeparator = memo(
  forwardRef<CameraSeparatorRef, CameraSeparatorProps>(function CameraSeparator(props, ref) {
    return (
      <BView className="pl-4 pr-0">
        <BView className="h-[1] w-full bg-light-border dark:bg-dark-border" />
      </BView>
    );
  }),
);

export default CameraSeparator;
