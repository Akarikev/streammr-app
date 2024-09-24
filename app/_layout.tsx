import { Slot, Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  StreamVideoClient,
  StreamVideo,
  User,
} from "@stream-io/video-react-native-sdk";
import Toast from "react-native-toast-message";
import { OverlayProvider } from "stream-chat-expo";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const InitialLayout = () => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    const user: User = {
      id: "4l442ekobwr", //generated ID
    };

    try {
      console.log("Creating client for StreamVideo...");
      const client = new StreamVideoClient({
        apiKey: STREAM_KEY! as string,
        user,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGw0NDJla29id3IifQ.xkZPCHQtOek84X4R8eNkPMh1AKjMarShLRzbt8ha6bM", //generated token
      });

      setClient(client);
    } catch (error) {
      console.log("Error creating client:", error);
    }
  }, []);

  return (
    <>
      {!client && (
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      )}

      {client && (
        <StreamVideo client={client}>
          <OverlayProvider>
            <Slot />
            <Toast />
          </OverlayProvider>
        </StreamVideo>
      )}
    </>
  );
};

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InitialLayout />
    </GestureHandlerRootView>
  );
};

export default RootLayout;
