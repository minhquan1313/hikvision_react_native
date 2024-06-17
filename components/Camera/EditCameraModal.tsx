import BBottomSheet from "@/components/Base/BBottomSheet";
import BButton from "@/components/Base/BButton";
import BInput from "@/components/Base/BInput";
import BSafeAreaView, { BSafeAreaViewProps } from "@/components/Base/BSafeAreaView";
import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useImmer } from "use-immer";

import BSelect from "@/components/Base/BSelect/BSelect";
import DarkLightToggle from "@/components/Base/DarkLightToggle";
import { useCameraListContextImmer } from "@/contexts/CameraListProvider";
import { ICamera } from "@/types/ICamera";
import { isSameObj } from "@/utils/isSameObj";
import { forwardRef, memo } from "react";

export interface EditCameraModalProps {
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  editCameraId?: ICamera["ip"];
}

export type EditCameraModalRef = null;

const EditCameraModal = memo(
  forwardRef<EditCameraModalRef, EditCameraModalProps>(function EditCameraModal(props, ref) {
    const {
      //
      editCameraId: editUserId,
      visible,
      onClose,
      onSubmit,
    } = props;

    const data = [
      { label: "Item 1", value: "1" },
      { label: "Item 2", value: "2" },
      { label: "Item 3", value: "3" },
      { label: "Item 4", value: "4" },
      { label: "Item 5", value: "5" },
      { label: "Item 6", value: "6" },
      { label: "Item 7", value: "7" },
      { label: "Item 8", value: "8" },
    ];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [list, setListImmer] = useCameraListContextImmer();
    const [value, setValue] = useState<string>();

    const itemToEdit = useMemo(() => {
      if (!editUserId) return undefined;

      return list.find((u) => u.ip === editUserId);
    }, [list, editUserId]);

    const [user, setUserImmer] = useImmer<ICamera>(
      itemToEdit || {
        alias: "",
        ip: "",
        loginUserId: "",
      },
    );
    const [valid, setValid] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);

    const [pending, startTransition] = useTransition();

    const xEdges = useMemo<BSafeAreaViewProps["excludeEdges"]>(() => ["top"], []);

    const cancelPress = useCallback(() => {
      onClose?.();
    }, [onClose]);

    const savePress = useCallback(() => {
      if (!valid) return;

      const isDup = !!list.find((u) =>
        isSameObj({
          first: u,
          second: user,
          // excludeKeys: ["alias"],
        }),
      );
      setIsDuplicate(isDup);

      if (isDup) return;

      setListImmer((d) => {
        if (!itemToEdit) {
          d.push(user);
        } else {
          const u = d.findIndex((u) => u.ip === editUserId);
          if (u === -1) return;
          d[u] = user;
        }
      });

      setUserImmer({
        ip: "",
        alias: "",
        loginUserId: "",
      });

      onSubmit?.();
    }, [editUserId, list, onSubmit, setListImmer, setUserImmer, user, itemToEdit, valid]);

    const deletePress = useCallback(() => {
      if (!itemToEdit) return;

      setListImmer((d) => {
        d = d.filter((u) => {
          return u.ip !== itemToEdit.ip;
        });

        return d;
      });

      onSubmit?.();
    }, [onSubmit, setListImmer, itemToEdit]);

    useEffect(() => {
      const isValidNotBlank = Object.keys(user).every((k) => {
        const key = k as keyof ICamera;
        return user[key] !== "";
      });

      const isValidUserEditDifferent = itemToEdit
        ? Object.keys(user).some((k) => {
            const key = k as keyof ICamera;
            return user[key] !== itemToEdit[key];
          })
        : true;

      setValid(isValidNotBlank && isValidUserEditDifferent);
      setIsDuplicate(false);
    }, [user, itemToEdit]);

    useEffect(() => {
      if (!itemToEdit || itemToEdit.ip === user.ip) return;
      setUserImmer({ ...itemToEdit });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemToEdit]);

    return (
      <BBottomSheet
        onClose={onClose}
        visible={visible}
        enableDynamicSizing
      >
        <BottomSheetView>
          <BSafeAreaView excludeEdges={xEdges}>
            <BView className="py-5">
              <BInput
                value={user.ip}
                title="IP"
                className="container mb-4"
                placeholder="Ví dụ: 192.168.1.97:40"
                onChangeText={(text) => {
                  startTransition(() => {
                    setUserImmer((u) => {
                      u.ip = text;
                    });
                  });
                }}
              />

              <BInput
                value={user.alias}
                title="Tên gợi nhớ"
                tabIndex={0}
                className="container mb-4"
                placeholder="Ví dụ: Đầu ghi chính"
                onChangeText={(text) => {
                  startTransition(() => {
                    setUserImmer((u) => {
                      u.alias = text;
                    });
                  });
                }}
              />

              <BSelect
                data={data}
                onChange={(v) => {
                  //
                }}
                title={"Tài khoản đăng nhập"}
                className="container mb-4"
              />

              {/* <BInput
                value={user.loginUserId}
                title="Tài khoản đăng nhập"
                tabIndex={0}
                className="container mb-4"
                onChangeText={(text) => {
                  startTransition(() => {
                    setUserImmer((u) => {
                      u.loginUserId = text;
                    });
                  });
                }}
              /> */}

              <BView className="container flex-row justify-center space-x-4 pt-5">
                <BButton
                  block
                  primary
                  disabled={!valid || pending || isDuplicate}
                  onPress={savePress}
                >
                  Lưu
                </BButton>

                {itemToEdit && (
                  <BButton
                    block
                    onPress={deletePress}
                  >
                    Xoá
                  </BButton>
                )}

                <BButton onPress={cancelPress}>Huỷ</BButton>

                <DarkLightToggle />
              </BView>

              {isDuplicate ? (
                <BView className="container flex-row justify-center space-x-4 pt-5">
                  <BText type="error">User bị trùng</BText>
                </BView>
              ) : null}
            </BView>
          </BSafeAreaView>
        </BottomSheetView>
      </BBottomSheet>
    );
  }),
);

export default EditCameraModal;
