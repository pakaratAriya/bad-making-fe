import { StyleSheet, Text } from "react-native";

export default function SmmAppTitle() {
  return <Text style={styles.header}>Bad 🏸 Making</Text>;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "InknutAntiqua_700Bold",
  },
});
