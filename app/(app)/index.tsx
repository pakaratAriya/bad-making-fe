import { SmmButton } from "@/components/buttons/SmmButton";
import SmmFlexButton from "@/components/buttons/SmmFlexButton";
import SmmFloatingButton from "@/components/buttons/SmmFloatingButton";
import { SmmTextButton } from "@/components/buttons/SmmTextButton";
import SmmRoundedTextInput from "@/components/Inputs/SmmRoundedTextInput";
import SmmAppTitle from "@/components/SmmAppTitle";
import { SmmFontFamily } from "@/constants/Typography";
import { AuthContext } from "@/contexts/authContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { signOut, nickname } = useContext(AuthContext);
  const { control, reset, setFocus } = useForm();

  const onClickBack = () => {
    signOut!();
  };

  const onClickReset = () => {
    reset();
  };

  const onClickSubmit = () => {};
  return (
    <View style={styles.container}>
      <SmmFloatingButton onPress={onClickBack} />
      <SmmAppTitle />
      <Text style={styles.welcomeMessage}>Welcome back {nickname}!</Text>
      <SmmRoundedTextInput
        control={control}
        label="Room Number"
        name="roomNo"
        keyboardType="number-pad"
        placeholder="Enter Room Numbers"
      />
      <View style={styles.actionBtnContainer}>
        <SmmFlexButton
          onPress={onClickReset}
          buttonStyle={styles.resetActionButton}
        >
          <Text style={styles.test}>✖️</Text>
        </SmmFlexButton>
        <SmmFlexButton
          onPress={onClickSubmit}
          buttonStyle={styles.submitActionButton}
        >
          <Text style={styles.test}>✔️</Text>
        </SmmFlexButton>
      </View>
      <SmmTextButton title="Create a new room?" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    padding: 8,
    backgroundColor: "white",
  },
  welcomeMessage: {
    fontFamily: SmmFontFamily.InknutAntiquaRegular,
    fontSize: 16,
    textAlign: "center",
  },
  actionBtnContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-evenly",
    marginHorizontal: "auto",
    marginTop: 20,
  },
  test: {
    fontFamily: SmmFontFamily.InknutAntiquaBold,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  resetActionButton: {
    borderColor: "#9A0000",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#E92A2A",
    height: 30,
    width: 80,
  },
  submitActionButton: {
    borderColor: "#34ED15",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#35B81F",
    height: 30,
    width: 80,
  },
});
