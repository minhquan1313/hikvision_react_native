import BText from "@/components/Base/BText";
import BView, { BViewProps } from "@/components/Base/BView";
import { useCustomColor } from "@/hooks/useCustomColor";
import { cn } from "@/utils/cn";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TextInputProps } from "react-native";

export interface BInputProps extends TextInputProps {
  //
  title?: string;
  style?: BViewProps["style"];
  textStyle?: TextInputProps["style"];
}

function BInput(props: BInputProps) {
  const {
    //
    value,
    title,
    style,
    textStyle,

    ..._props
  } = props;

  const { greyed, text } = useCustomColor();

  return (
    <BView style={style}>
      <BText className="mx-3 mb-1">{title}</BText>

      <BView
        className={cn("rounded-lg border border-light-border dark:border-dark-border ", {
          "bg-light-card dark:bg-dark-card": !_props.readOnly,
          "bg-dark-text dark:bg-light-text ": _props.readOnly,
        })}
      >
        <BottomSheetTextInput
          value={value}
          // className={cn("font-SVNPoppins400 text-lg", {
          //   "text-light-text dark:text-dark-text": !_props.readOnly,
          //   "text-light-greyed dark:text-dark-greyed": _props.readOnly,
          // })}
          placeholderTextColor={greyed}
          style={[
            {
              outline: "none",
              fontSize: 16,
              lineHeight: 28,

              paddingVertical: 8,
              paddingHorizontal: 12,

              color: _props.readOnly ? greyed : text,
              fontFamily: "SVNPoppins400",
            } as TextInputProps["style"],
            textStyle,
          ]}
          {..._props}
        />
      </BView>
    </BView>
  );
}

export default BInput;
