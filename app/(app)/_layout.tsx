import { AuthContext } from "@/contexts/authContext";
import { Redirect, Slot, Stack } from "expo-router";
import { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function AppLayout() {
  const { status, token } = useContext(AuthContext);
  if (status === "loading") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (status === "no_user") {
    return <Redirect href="/sign-up/" />;
  }

  if (!token) {
    return <Redirect href="/sign-in/" />;
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
