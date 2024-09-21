import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useAuth } from "@/hooks/authcontext";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { onLogin, onRegister } = useAuth();

  const onSignUpPressed = async () => {
    setLoading(true);

    try {
      const res = await onRegister!(email, password);
      console.log(res);
    } catch (error: any) {
      if (error.response && error.response.data) {
        Alert.alert("Error", error.response.data.msg);
      } else {
        console.log("Error", error);
        Alert.alert("Error", error.message || "An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSignInPressed = async () => {
    setLoading(true);

    try {
      const res = await onLogin!(email, password);
      console.log(res);
    } catch (error: any) {
      if (error.response && error.response.data) {
        Alert.alert("Error", error.response.data.msg);
      } else {
        console.log("Error", error);
        Alert.alert("Error", error.message || "An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Spinner visible={loading} />

      <Text style={styles.header}>Streammrr</Text>
      <Text style={styles.sbHeader}>Streammrr Test</Text>
      <Text style={styles.sbHeader}>Sign In to continue</Text>

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={{
            padding: 4,
            borderBottomColor: "#0a7ea4",
            borderBottomWidth: 1,
            marginBottom: 30,
          }}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            padding: 4,
            marginTop: 20,
            borderBottomColor: "#0a7ea4",
            borderBottomWidth: 1,
          }}
        />

        <TouchableOpacity
          style={{
            marginTop: 40,
            padding: 20,
            backgroundColor: "#0a7ea4",
            alignItems: "center",
            borderRadius: 5,
            marginBottom: 10,
          }}
          onPress={onSignInPressed}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>

        <Text
          onPress={onSignUpPressed}
          style={{ textAlign: "center", fontSize: 17, color: "#074eab" }}
        >
          Don't have an account, Sign Up
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: WIDTH > HEIGHT ? "30%" : "auto",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },

  sbHeader: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    color: "#0a7ea4",
  },
});
