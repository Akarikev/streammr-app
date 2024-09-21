import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const WIDTH = Dimensions.get("window").width;

const Home = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [roomId, setRoomId] = useState("");

  const onStartMeeting = async () => {
    // Your start meeting logic here
    const randomId = Math.floor(Math.random() * 1000000000).toString();
    router.push(`/(Home)/(callroom)/${randomId}`);
  };

  const onJoinMeeting = () => {
    setModalVisible(true); // Open the modal to prompt for the room ID
  };

  const handleJoin = () => {
    if (roomId.trim()) {
      setModalVisible(false);
      router.push(`/(Home)/(callroom)/${roomId}`);
    } else {
      alert("Please enter a valid room ID");
    }
  };

  const Rooms = () => {
    const rooms = [
      { id: 1, room_name: "Chill Room" },
      { id: 2, room_name: "Meeting Room" },
      { id: 3, room_name: "Gaming Hub" },
      { id: 4, room_name: "Workstation" },
      { id: 5, room_name: "Study Room" },
      { id: 6, room_name: "Brainstorming Space" },
    ];

    return (
      <View style={styles.roomContainer}>
        {rooms.map((room) => (
          <View key={room.id} style={styles.roomCard}>
            <View style={styles.roomHeader}>
              <Text style={styles.roomName}>{room.room_name}</Text>
              <Ionicons name="videocam" size={24} color="#0A7EA4" />
            </View>
            <Link href={`/(Home)/(callroom)/${room.id}`} asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.buttonText}>Join {room.room_name}</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.primaryButton} onPress={onStartMeeting}>
        <Ionicons name="add-circle" size={24} color="white" />
        <Text style={styles.primaryButtonText}>Start a Meeting</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.primaryButton} onPress={onJoinMeeting}>
        <Ionicons name="add-circle" size={24} color="white" />
        <Text style={styles.primaryButtonText}>Join Call by ID</Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 21,
          // fontWeight: "bold",
          fontWeight: "600",
          color: "#0A7EA4",
          // fontFamily: "Inter-Black",
        }}
      >
        No Meetings? Join a Public Room
      </Text>
      <Rooms />

      {/* Modal for entering room ID */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Room ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Room ID"
              value={roomId}
              onChangeText={(text) => setRoomId(text)}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleJoin}>
                <Text style={styles.modalButtonText}>Join</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#F9FBFC",
    // fontFamily: "Inter-Black",
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A7EA4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginVertical: 20,
    fontFamily: "Inter-Black",
  },
  primaryButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    marginLeft: 10,
    fontFamily: "Inter-Black",
  },
  roomContainer: {
    width: WIDTH * 0.9,
    marginTop: 20,
    fontFamily: "Inter-Black",
  },
  roomCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    borderLeftWidth: 5,
    borderLeftColor: "#0A7EA4",
    fontFamily: "Inter-Black",
  },
  roomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontFamily: "Inter-Black",
  },
  roomName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Inter-Black",
  },
  secondaryButton: {
    backgroundColor: "#E9F7FA",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    fontFamily: "Inter-Black",
  },
  buttonText: {
    fontSize: 16,
    color: "#0A7EA4",
    fontWeight: "600",
    fontFamily: "Inter-Black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    fontFamily: "Inter-Black",
  },
  modalView: {
    width: WIDTH * 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    fontFamily: "Inter-Black",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    fontFamily: "Inter-Black",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: "Inter-Black",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    fontFamily: "Inter-Black",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0A7EA4",
    borderRadius: 10,
    fontFamily: "Inter-Black",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-Black",
  },
  cancelButton: {
    backgroundColor: "red",
    fontFamily: "Inter-Black",
  },
});
