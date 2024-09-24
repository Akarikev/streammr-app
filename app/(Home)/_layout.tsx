import { View, Text } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

const Layout = () => {
  // const { onLogout } = useAuth();

  const onLogout = () => {
    console.log("Logout");
    router.navigate("/");
  };
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },

        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Call Room",
          headerRight: () => (
            <TouchableOpacity onPress={onLogout}>
              <AntDesign name="logout" size={24} color="red" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(callroom)/[id]"
        options={{
          title: "Call room",
        }}
      />
    </Stack>
  );
};

export default Layout;
