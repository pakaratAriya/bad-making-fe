import SmmAppTitle from "@/components/SmmAppTitle";
import { SmmButton } from "@/components/buttons/SmmButton";
import { SmmTextButton } from "@/components/buttons/SmmTextButton";
import SmmTextInput from "@/components/Inputs/SmmTextInput";
import { AuthContext } from "@/contexts/authContext";
import { useFonts } from "expo-font";
import { router } from "expo-router";

import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, View } from "react-native";

export default function SignIn() {
  const { signIn, token } = useContext(AuthContext);
  const { register, control, setValue, handleSubmit } = useForm();
  const [appIsReady, setAppIsReady] = useState();
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    signIn!(data["phoneNo"]);
    router.replace("/");
  };

  const onRegisterClick = () => {
    router.replace("/sign-up");
  };

  return (
    <View style={styles.container}>
      <Text>{token}</Text>
      <SmmAppTitle />
      <SmmTextInput
        label="Phone Number"
        name="phoneNo"
        control={control}
        keyboardType="phone-pad"
        required={true}
      />
      <SmmButton title="Login" onPress={handleSubmit(onSubmit)} />
      <SmmTextButton
        title="Don't have account yet?"
        onPress={onRegisterClick}
      />
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
});
