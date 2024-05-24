import BText from "@/components/BText";

export interface SettingProps {
  //
}

function Setting(props: SettingProps) {
  const {
    //

    ..._props
  } = props;

  return (
    <BText
      //
      {..._props}
    >
      {/*  */}
      Setting
    </BText>
  );
}

export default Setting;
