import BInput from "@/components/Base/BInput";
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
      // withKeyboard
    >
      {/* <Modal visible={true}>
        <KeyboardAvoidingView
          behavior="padding"
          className="absolute bottom-0 left-0 right-0 bg-red-300"
        >
          <BSafeAreaView>
            <BView type="background">
              <BText>Hihi Hihi Hihi Hihi Hihi Hihi </BText>
              <BInput placeholder="123" />
            </BView>
          </BSafeAreaView>
        </KeyboardAvoidingView>
      </Modal> */}
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
            <BView
              className="items-center p-4"
              // className="items-center rounded-lg border border-light-border bg-light-card p-4 dark:border-dark-border dark:bg-dark-card"
            >
              <EmptySvg
                size={240}
                className="max-w-full"
                autoHeight
                color={primary}
              />
              <BText
                type="title"
                size="3xl"
                className="mt-8"
              >
                Chưa có dữ liệu
              </BText>
              <BText className="mt-2">Hãy thêm tài khoản đăng nhập</BText>
            </BView>
          </BView>
        }
        ListFooterComponent={<BInput value="123" />}
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
      <BInput value="123" />

      <BView
        className="flex-row items-end justify-end space-x-4 p-5"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        <DarkLightToggle circle />

        <PlusButton
          circle
          onPress={() => setVisible(true)}
        />
      </BView>
    </BSafeAreaView>
  );
}

export default UserList;
