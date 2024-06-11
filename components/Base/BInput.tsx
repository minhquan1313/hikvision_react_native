import BText from "@/components/Base/BText";
import BView, { BViewProps } from "@/components/Base/BView";
import { TextInput, TextInputProps } from "react-native";

export interface BInputProps extends TextInputProps {
  //
  style?: BViewProps["style"];
}

function BInput(props: BInputProps) {
  const {
    //
    value,
    placeholder,
    style,

    ..._props
  } = props;

  return (
    <BView style={style}>
      <BText className="mb-1 ml-3">{placeholder}</BText>

      <BView className="rounded-lg border border-light-border bg-light-card px-3 py-2 dark:border-dark-border dark:bg-dark-card">
        <TextInput
          value={value}
          className="font-SVNPoppins400 text-lg text-light-text dark:text-dark-text"
          {..._props}
        />
      </BView>
    </BView>
  );
}

export default BInput;
