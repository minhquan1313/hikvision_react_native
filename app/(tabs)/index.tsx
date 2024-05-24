import BText from "@/components/BText";
import BView from "@/components/BView";
import DarkLightToggle from "@/components/DarkLightToggle";
import { SafeAreaView } from "react-native-safe-area-context";

export interface CameraListProps {
  //
}

function CameraList(props: CameraListProps) {
  const {
    //

    ..._props
  } = props;

  return (
    <SafeAreaView className="">
      <BView>
        <BView className="container">
          <BText
            type="text"
            {..._props}
          >
            {/*  */}
            CameraList
          </BText>
        </BView>

        <BView className="container">
          <DarkLightToggle />
        </BView>
      </BView>
    </SafeAreaView>
  );
}

export default CameraList;
