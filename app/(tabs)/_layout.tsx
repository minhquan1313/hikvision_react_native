import BTabs from "@/components/Base/BTabs";
import TabBarIcon from "@/components/Base/TabBarIcon";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";

function TabLayout() {
  return (
    <BTabs
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        // lazy: false,
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
                />
                // <EmptySvg
                //   color={props.color}
                //   size={26}
                // />
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
