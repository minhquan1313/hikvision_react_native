import BBottomSheet from "@/components/Base/BBottomSheet";
import BButton from "@/components/Base/BButton";
import BInput from "@/components/Base/BInput";
import BSafeAreaView, { BSafeAreaViewProps } from "@/components/Base/BSafeAreaView";
import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import DarkLightToggle from "@/components/Base/DarkLightToggle";
import { useUserListContextImmer } from "@/contexts/UserListProvider";
import { ILoginAccount } from "@/types/ILoginAccount";
import { isSameObj } from "@/utils/isSameObj";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useImmer } from "use-immer";

export interface EditUserModalProps {
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  editUserId?: ILoginAccount["useId"];
}

function EditUserModal(props: EditUserModalProps) {
  const {
    //
    editUserId,
    visible,
    onClose,
    onSubmit,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [list, setListImmer] = useUserListContextImmer();

  const itemToEdit = useMemo(() => {
    if (!editUserId) return undefined;

    return list.find((u) => u.useId === editUserId);
  }, [list, editUserId]);

  const [user, setUserImmer] = useImmer<ILoginAccount>(
    itemToEdit || {
      useId: String(new Date().getTime()),
      username: "",
      password: "",
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
        excludeKeys: ["useId"],
      }),
    );
    setIsDuplicate(isDup);

    if (isDup) return;

    setListImmer((d) => {
      if (!itemToEdit) {
        d.push(user);
      } else {
        const u = d.findIndex((u) => u.useId === editUserId);
        if (u === -1) return;
        d[u] = user;
      }
    });

    setUserImmer({
      useId: String(new Date().getTime()),
      username: "",
      password: "",
    });

    onSubmit?.();
  }, [editUserId, list, onSubmit, setListImmer, setUserImmer, user, itemToEdit, valid]);

  const deletePress = useCallback(() => {
    if (!itemToEdit) return;

    setListImmer((d) => {
      d = d.filter((u) => {
        return u.useId !== itemToEdit.useId;
      });

      return d;
    });

    onSubmit?.();
  }, [onSubmit, setListImmer, itemToEdit]);

  useEffect(() => {
    const isValidNotBlank = Object.keys(user).every((k) => {
      const key = k as keyof ILoginAccount;
      return user[key].trim() !== "";
    });

    const isValidUserEditDifferent = itemToEdit
      ? Object.keys(user).some((key) => {
          return user[key as keyof ILoginAccount] !== itemToEdit[key as keyof ILoginAccount];
        })
      : true;

    setValid(isValidNotBlank && isValidUserEditDifferent);
    setIsDuplicate(false);
  }, [user, itemToEdit]);

  useEffect(() => {
    if (!itemToEdit || itemToEdit.useId === user.useId) return;
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
              value={user.useId}
              title="ID"
              readOnly
              placeholder="Không nên thay đổi ID này"
              className="container mb-4"
            />

            <BInput
              value={user.username}
              title="Tên đăng nhập v22"
              className="container mb-4"
              tabIndex={0}
              onChangeText={(text) => {
                startTransition(() => {
                  setUserImmer((u) => {
                    u.username = text;
                  });
                });
              }}
              placeholder="Ví dụ: admin"
            />

            <BInput
              value={user.password}
              title="Mật khẩu"
              className="container mb-4"
              tabIndex={0}
              onChangeText={(text) => {
                startTransition(() => {
                  setUserImmer((u) => {
                    u.password = text;
                  });
                });
              }}
            />

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
}

export default EditUserModal;
