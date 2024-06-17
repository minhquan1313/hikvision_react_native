import BButton from "@/components/Base/BButton";
import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import { ILoginAccount } from "@/types/ILoginAccount";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { forwardRef, memo, useCallback } from "react";

export interface UserListItemProps {
  item: ILoginAccount;
  onPress: (id: ILoginAccount["useId"]) => void;
  selected?: boolean;
  onSelectChange?: (id: ILoginAccount["useId"], value: boolean) => void;
}

export type UserListItemRef = null;

const UserListItem = memo(
  forwardRef<UserListItemRef, UserListItemProps>(function UserListItem(props, ref) {
    const {
      //
      onPress,
      item,
      selected,
      onSelectChange,
      ..._props
    } = props;

    const onPressCb = useCallback(() => {
      onPress(item.useId);
    }, [item.useId, onPress]);

    const onCheckboxHandle = useCallback(
      (value: boolean) => {
        onSelectChange?.(item.useId, value);
      },
      [item.useId, onSelectChange],
    );

    return (
      <BView
        align="horizontal"
        className="space-x-4 py-2"
      >
        <BView className="pl-4 pt-2">
          <Checkbox
            value={selected}
            onValueChange={onCheckboxHandle}
          />
        </BView>

        <BButton
          noBg
          onPress={onPressCb}
          {..._props}
        >
          <BView
            align="vertical"
            className="space-y-2"
          >
            <BView
              align="horizontal"
              className="items-end space-x-2"
            >
              <BText
                type="text alt"
                className="w-6 text-center"
              >
                <FontAwesome5
                  name="key"
                  size={16}
                />
              </BText>
              <BText
                type="text alt"
                size="sm"
              >
                {item.useId}
              </BText>
            </BView>

            <BView
              align="horizontal"
              className="space-x-2"
            >
              <BText className="w-6">
                <Ionicons
                  name="person-sharp"
                  size={24}
                />
              </BText>
              <BText type="subtitle">{item.username}</BText>
            </BView>

            <BView
              align="horizontal"
              className="space-x-2"
            >
              <BText className="w-6">
                <MaterialCommunityIcons
                  name="key"
                  size={24}
                />
              </BText>
              <BText>{item.password}</BText>
            </BView>
          </BView>
          {/* <BView className="space-x-4 ">
            <BButton
            // icon={
            //   <MaterialIcons
            //     name="more"
            //     size={24}
            //     // color="black"
            //   />
            // }
            >
              <MaterialIcons
                name="more"
                size={24}
                // color="black"
              />
            </BButton>
          </BView> */}
        </BButton>
      </BView>
    );
  }),
);

export default UserListItem;
