import BSafeAreaView, { BSafeAreaViewProps } from "@/components/Base/BSafeAreaView";
import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import DeleteButton from "@/components/Base/Buttons/DeleteButton";
import PlusButton from "@/components/Base/Buttons/PlusButton";
import SelectAllButton from "@/components/Base/Buttons/SelectAllButton";
import DarkLightToggle from "@/components/Base/DarkLightToggle";
import EmptySvg from "@/components/Base/Svgs/EmptySvg";
import EditCameraModal from "@/components/Camera/EditCameraModal";
import { UserListItemProps } from "@/components/User/UserListItem";
import UserSeparator from "@/components/User/UserSeparator";
import { useCameraListContextImmer } from "@/contexts/CameraListProvider";
import { useBottomBarAndroid } from "@/hooks/useBottomBarAndroid";
import { ICamera } from "@/types/ICamera";
import { TRCallBack } from "@/types/TRCallBack";
import { useCallback, useMemo, useState } from "react";
import { FlatList, LayoutChangeEvent } from "react-native";
import { useImmer } from "use-immer";

function CameraList() {
  const [list, setListImmer] = useCameraListContextImmer();

  const [visible, setVisible] = useState(true);
  const [itemSelected, setItemSelectedImmer] = useImmer<ICamera["ip"][]>([]);
  const [editCameraIP, setEditCameraIP] = useState<ICamera["ip"]>();
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
      setEditCameraIP(id);
      setVisible(true);

      if (id !== editCameraIP) setModalKey(new Date().getTime());
    },
    [editCameraIP],
  );

  const onModalCloseHandle = useCallback(() => {
    setVisible(false);
    forceUpdate(1);
  }, [forceUpdate]);

  const onSubmitHandle = useCallback(() => {
    setEditCameraIP(undefined);

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
    setItemSelectedImmer(list.map((u) => u.ip));
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
      return list.filter((u) => !itemSelected.includes(u.ip));
    });
  }, [itemSelected, setListImmer]);

  const plusPressHandle = useCallback(() => {
    setVisible(true);
    setEditCameraIP(undefined);

    if (editCameraIP) setModalKey(new Date().getTime());
  }, [editCameraIP]);

  return (
    <BSafeAreaView
      excludeEdges={xEdges}
      className="flex-1"
    >
      <FlatList
        data={list}
        renderItem={(data) => (
          <></>
          // <UserListItem
          //   selected={itemSelected.includes(data.item.useId)}
          //   onSelectChange={onItemSelectChangeHandle}
          //   onPress={onUserEditHandle}
          //   {...data}
          // />
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
              <BText className="mt-2">Hãy thêm IP camera</BText>
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

      <EditCameraModal
        key={modalKey}
        visible={visible}
        onClose={onModalCloseHandle}
        onSubmit={onSubmitHandle}
        editCameraId={editCameraIP}
      />
    </BSafeAreaView>
  );
}

export default CameraList;
