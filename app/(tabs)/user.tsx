import BButton from "@/components/Base/BButton";
import BSafeAreaView from "@/components/Base/BSafeAreaView";
import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import PlusButton from "@/components/Base/Buttons/PlusButton";
import DarkLightToggle from "@/components/Base/DarkLightToggle";
import EmptySvg from "@/components/Base/Svgs/EmptySvg";
import EditUserModal from "@/components/Camera/EditUserModal";
import { useUserListContextImmer } from "@/contexts/UserListProvider";
import { useBottomBarAndroid } from "@/hooks/useBottomBarAndroid";
import { useCustomColor } from "@/hooks/useCustomColor";
import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";

export interface UserListProps {
  //
}

function UserList(props: UserListProps) {
  const [userList, setUserList] = useUserListContextImmer();
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
      <EditUserModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
      <FlatList
        data={userList}
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
                Thêm thông tin đăng nhập đi ba ơi...
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

export default UserList;
