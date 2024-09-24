import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Streammr Test</Text>

      <View style={{ marginTop: 20, width: "100%" }}>
        <Link href="/(Home)" asChild>
          <TouchableOpacity
            style={{
              padding: 18,
              backgroundColor: "blue",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>Go into Call</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
