import BButton from "@/components/Base/BButton";
import BSafeAreaView from "@/components/Base/BSafeAreaView";
import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import PlusButton from "@/components/Base/Buttons/PlusButton";
import DarkLightToggle from "@/components/Base/DarkLightToggle";
import EmptySvg from "@/components/Base/Svgs/EmptySvg";
import EditCameraModal from "@/components/Camera/EditCameraModal";
import { useCameraListContextImmer } from "@/contexts/CameraListProvider";
import { useBottomBarAndroid } from "@/hooks/useBottomBarAndroid";
import { useCustomColor } from "@/hooks/useCustomColor";
import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";

function CameraList() {
  const [cameraList, setCameraList] = useCameraListContextImmer();
  const { primary } = useCustomColor();
  const [visible, setVisible] = useState(false);

  useBottomBarAndroid({
    themeColor: "card",
  });

  return (
    <BSafeAreaView
      excludeEdges={["bottom"]}
      className="flex-1"
    >
      <EditCameraModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
      <FlatList
        data={cameraList}
        renderItem={(data) => <BText>1</BText>}
        ListEmptyComponent={
          <BView className="container my-4 flex-1 justify-center">
            <BView className="items-center rounded-lg border border-light-border bg-light-card p-4 dark:border-dark-border dark:bg-dark-card">
              <EmptySvg
                size={92}
                className="max-w-full"
                autoHeight
                color={primary}
              />

              <BText
                type="mini text"
                className="mt-4"
              >
                Thêm cam đi ba ơi...
              </BText>
            </BView>
          </BView>
        }
        contentContainerStyle={{
          height: "100%",
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {}}
          />
        }
      />

      <BView className="container my-4">
        <PlusButton onPress={() => setVisible(true)} />
        <BButton onPress={() => setVisible(true)}>Visible</BButton>
        <DarkLightToggle />
      </BView>
    </BSafeAreaView>
  );
}

export default CameraList;
