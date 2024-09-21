import { AuthProvider, useAuth } from "@/hooks/authcontext";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import React, { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  StreamVideoClient,
  StreamVideo,
  User,
} from "@stream-io/video-react-native-sdk";
import Toast from "react-native-toast-message";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

import { OverlayProvider } from "stream-chat-expo";
import { ToastAndroid } from "react-native";

const InitialLayout = () => {
  const { authState, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    // Log for debugging
    console.log("AuthState:", authState);
    console.log("Initialized:", initialized);

    if (!initialized) {
      return;
    }

    const inAuthGroup = segments[0] === "(Home)";
    console.log("In Auth Group:", inAuthGroup);

    if (authState?.authenticated && inAuthGroup) {
      console.log("Redirecting to home, user is authenticated");
      router.replace("/(Home)");
    } else if (!authState?.authenticated && !inAuthGroup) {
      console.log("Not authenticated, redirecting to login");
      router.replace("/");
    }
  }, [authState, initialized, segments]);

  useEffect(() => {
    if (authState?.authenticated && authState.token) {
      console.log("Creating client for StreamVideo...", authState);

      const user: User = {
        id: authState.user_id!,
      };

      try {
        const client = new StreamVideoClient({
          apiKey: STREAM_KEY! as string,
          user,
          token: authState.token,
        });

        setClient(client);
      } catch (error) {
        console.log("Error creating client:", error);
      }
    }
  }, [authState]);

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
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default RootLayout;
