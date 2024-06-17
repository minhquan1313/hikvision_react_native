import BSafeAreaView, { BSafeAreaViewProps } from "@/components/Base/BSafeAreaView";
import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import DeleteButton from "@/components/Base/Buttons/DeleteButton";
import PlusButton from "@/components/Base/Buttons/PlusButton";
import SelectAllButton from "@/components/Base/Buttons/SelectAllButton";
import DarkLightToggle from "@/components/Base/DarkLightToggle";
import EmptySvg from "@/components/Base/Svgs/EmptySvg";
import EditUserModal from "@/components/User/EditUserModal";
import UserListItem, { UserListItemProps } from "@/components/User/UserListItem";
import UserSeparator from "@/components/User/UserSeparator";
import { useUserListContextImmer } from "@/contexts/UserListProvider";
import { useBottomBarAndroid } from "@/hooks/useBottomBarAndroid";
import { ILoginAccount } from "@/types/ILoginAccount";
import { TRCallBack } from "@/types/TRCallBack";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, LayoutChangeEvent } from "react-native";
import { useImmer } from "use-immer";

export interface UserListProps {
  //
}

function UserList(props: UserListProps) {
  const [list, setListImmer] = useUserListContextImmer();

  const [visible, setVisible] = useState(false);
  const [itemSelected, setItemSelectedImmer] = useImmer<ILoginAccount["useId"][]>([]);
  const [editUserId, setEditUserId] = useState<ILoginAccount["useId"]>();
  const [modalKey, setModalKey] = useState(new Date().getTime());
  const [floatHeight, setFloatHeight] = useState(0);

  const { forceUpdate } = useBottomBarAndroid({
    themeColor: "card",
  });

  const xEdges = useMemo<BSafeAreaViewProps["excludeEdges"]>(() => ["bottom"], []);

  const onFloatBtnLayoutHandle = useCallback((e: LayoutChangeEvent) => {
    setFloatHeight(e.nativeEvent.layout.height);
  }, []);

  const onUserEditHandle = useCallback(
    (id: string): void => {
      setEditUserId(id);
      setVisible(true);

      if (id !== editUserId) setModalKey(new Date().getTime());
    },
    [editUserId],
  );

  const onModalCloseHandle = useCallback(() => {
    setVisible(false);
    forceUpdate(1);
  }, [forceUpdate]);

  const onSubmitHandle = useCallback(() => {
    setEditUserId(undefined);

    setModalKey(new Date().getTime());

    onModalCloseHandle();
  }, [onModalCloseHandle]);

  const selectAllToggleHandle = useCallback(() => {
    if (itemSelected.length === list.length) {
      // unselect all
      setItemSelectedImmer([]);
      return;
    }
    // select all
    setItemSelectedImmer(list.map((u) => u.useId));
  }, [itemSelected.length, setItemSelectedImmer, list]);

  const onItemSelectChangeHandle = useCallback<TRCallBack<UserListItemProps["onSelectChange"]>>(
    (id, isSelected) => {
      setItemSelectedImmer((ids) => {
        if (isSelected) {
          ids.push(id);
        } else {
          return ids.filter((i) => i !== id);
        }
      });
    },
    [setItemSelectedImmer],
  );

  const deletePressHandle = useCallback(() => {
    if (!itemSelected.length) {
      return;
    }
    setListImmer((list) => {
      return list.filter((u) => !itemSelected.includes(u.useId));
    });

    setItemSelectedImmer([]);
  }, [itemSelected, setItemSelectedImmer, setListImmer]);

  const plusPressHandle = useCallback(() => {
    setVisible(true);
    setEditUserId(undefined);

    if (editUserId) setModalKey(new Date().getTime());
  }, [editUserId]);

  return (
    <BSafeAreaView
      excludeEdges={xEdges}
      className="flex-1"
    >
      <FlatList
        data={list}
        renderItem={(data) => (
          <UserListItem
            selected={itemSelected.includes(data.item.useId)}
            onSelectChange={onItemSelectChangeHandle}
            onPress={onUserEditHandle}
            {...data}
          />
        )}
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
        ItemSeparatorComponent={UserSeparator}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: list.length ? floatHeight : 0 }}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={false}
        //     onRefresh={() => {}}
        //   />
        // }
      />
      <BView
        className="absolute bottom-0 right-0 flex-row items-end justify-end space-x-4 p-4"
        onLayout={onFloatBtnLayoutHandle}
      >
        {itemSelected.length ? (
          <DeleteButton
            circle
            onPress={deletePressHandle}
          />
        ) : null}

        {list.length ? (
          <SelectAllButton
            primary={itemSelected.length === list.length}
            circle
            onPress={selectAllToggleHandle}
          />
        ) : null}

        <DarkLightToggle circle />

        <PlusButton
          circle
          onPress={plusPressHandle}
        />
      </BView>
      <EditUserModal
        key={modalKey}
        visible={visible}
        onClose={onModalCloseHandle}
        onSubmit={onSubmitHandle}
        editUserId={editUserId}
      />
    </BSafeAreaView>
  );
}

export default UserList;
