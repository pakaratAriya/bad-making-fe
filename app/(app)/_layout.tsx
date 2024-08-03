import { AuthContext } from "@/contexts/authContext";
import { Redirect, Slot, Stack } from "expo-router";
import { useContext } from "react";
import { Text } from "react-native";

export default function AppLayout() {
  const { status, token } = useContext(AuthContext);
  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (status === "no_user") {
    return <Redirect href="/sign-up/" />;
  }

  if (!token) {
    return <Redirect href="/sign-in/" />;
  }

  return <Slot />;
}
