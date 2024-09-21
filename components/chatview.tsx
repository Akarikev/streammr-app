import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StreamChat, Channel as ChannelType } from "stream-chat";
import { useAuth } from "@/hooks/authcontext";
import {
  Channel,
  Chat,
  DefaultStreamChatGenerics, // Use DefaultGenerics to avoid type issues
  MessageInput,
  MessageList,
} from "stream-chat-expo";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

type Props = {
  channelId: string;
};

const ChatView = ({ channelId }: Props) => {
  const chatClient = StreamChat.getInstance<DefaultStreamChatGenerics>(
    STREAM_KEY!
  ); // Use DefaultGenerics here
  const { authState } = useAuth();
  const [chatChannel, SetChatChannel] = useState<
    ChannelType<DefaultStreamChatGenerics> | undefined
  >(undefined); // Ensure types match

  // Connect to the channel with the same ID as the video call
  React.useEffect(() => {
    let isActive = true;

    const connectToChat = async () => {
      try {
        const user = { id: authState?.user_id! };

        // Connect user to chat client
        await chatClient.connectUser(user, authState?.token!);

        // Create and watch the channel
        const channel = chatClient.channel("messaging", channelId);
        await channel.watch();

        if (isActive) {
          SetChatChannel(channel); // Only set state if component is still mounted
        }
      } catch (error) {
        console.error("Error connecting to chat:", error);
      }
    };

    connectToChat();

    return () => {
      isActive = false; // Mark the component as unmounted
      chatChannel?.stopWatching();
      chatClient.disconnectUser(); // Ensure the user is disconnected cleanly
    };
  }, [authState, channelId]);

  return (
    <>
      {chatClient && chatChannel ? (
        <Chat client={chatClient}>
          <Channel channel={chatChannel}>
            <MessageList />
            <MessageInput />
          </Channel>
        </Chat>
      ) : (
        <View>
          <Text style={{ color: "white" }}>Loading Chat...</Text>
        </View>
      )}
    </>
  );
};

export default ChatView;
