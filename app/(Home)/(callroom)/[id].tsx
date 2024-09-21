import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Share,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import {
  Call,
  CallContent,
  StreamCall,
  StreamVideoEvent,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import Spinner from "react-native-loading-spinner-overlay";
import ChatView from "@/components/chatview";
import CustomBottomSheet from "@/components/custombottomsheet";
import CustomTopView from "@/components/customtopview";
import CustomCallControls from "@/components/customcallcontrols";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const CallRoom = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [call, setCall] = React.useState<Call | null>(null);

  const client = useStreamVideoClient();
  const { width, height } = useWindowDimensions(); // Dynamic width and height for responsive design
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={shareMeeting}>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
    });

    // Listen to call events
    const unsubscribe = client!.on("all", (event: StreamVideoEvent) => {
      console.log(event);

      if (event.type === "call.reaction_new") {
        console.log(`New reaction: ${event.reaction}`);
      }

      if (event.type === "call.session_participant_joined") {
        console.log(`New user joined the call: ${event.participant}`);
        const user = event.participant.user.name;
        Toast.show({
          text1: "User joined",
          text2: `Say hello to ${user} 👋`,
        });
      }

      if (event.type === "call.session_participant_left") {
        console.log(`Someone left the call: ${event.participant}`);
        const user = event.participant.user.name;
        Toast.show({
          text1: "User left",
          text2: `Say goodbye to ${user} 👋`,
        });
      }
    });

    // Stop the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const shareMeeting = async () => {
    Share.share({
      message: `Join my meeting here at  myapp://(Home)/(callroom)/${id}`,
    });
  };

  React.useEffect(() => {
    if (!client || call) {
      return;
    }

    const joinInCall = async () => {
      try {
        console.log("Joining call...", id);
        const call = client.call("default", id);
        await call.join({ create: true });
        setCall(call);
      } catch (error) {
        console.error("Failed to join call:", error);
      }
    };

    joinInCall();

    return () => {
      // Cleanup: optional cleanup logic if needed
    };
  }, [client, call]); // Add `call` to dependency array to avoid unnecessary re-renders

  if (!call) {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner visible={true} textContent="Joining call..." />
      </View>
    );
  }

  const closeCall = async () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StreamCall call={call}>
        <View style={styles.container}>
          <CallContent
            onHangupCallHandler={closeCall}
            layout="grid"
            CallTopView={CustomTopView}
            CallControls={CustomCallControls}
          />
          {/* Adjust layout dynamically based on orientation */}
          {width > height ? (
            <View style={styles.chatContainer}>
              <Text>Meeting ID: {id}</Text>
              <ChatView channelId={id} />
            </View>
          ) : (
            <CustomBottomSheet channelId={id} />
          )}
        </View>
      </StreamCall>
    </View>
  );
};

export default CallRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row", // Default row for landscape mode, changed dynamically
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#011100",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
