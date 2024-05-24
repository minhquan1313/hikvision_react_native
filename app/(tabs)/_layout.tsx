import BTabs from "@/components/BTabs";
import TabBarIcon from "@/components/TabBarIcon";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";

export interface TabLayoutProps {
  //
}

function TabLayout(props: TabLayoutProps) {
  const {
    //

    ..._props
  } = props;

  return (
    <BTabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <BTabs.Screen
        name="index"
        options={{
          title: "Camera",
          tabBarIcon: (props) => (
            <TabBarIcon
              title="Camera"
              icon={
                <Entypo
                  name="drive"
                  size={26}
                  color={props.color}
                />
              }
              {...props}
            />
          ),
        }}
      />
      <BTabs.Screen
        name="user"
        options={{
          title: "Người dùng",
          tabBarIcon: (props) => (
            <TabBarIcon
              title="Người dùng"
              icon={
                <FontAwesome
                  name="user"
                  size={26}
                  color={props.color}
                />
              }
              {...props}
            />
          ),
        }}
      />
      <BTabs.Screen
        name="setting"
        options={{
          title: "Cài đặt",
          tabBarIcon: (props) => (
            <TabBarIcon
              title="Cài đặt"
              icon={
                <Ionicons
                  name="settings"
                  size={26}
                  color={props.color}
                />
              }
              {...props}
            />
          ),
        }}
      />
    </BTabs>
  );
}

export default TabLayout;
