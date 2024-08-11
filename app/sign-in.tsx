import SmmAppTitle from "@/components/SmmAppTitle";
import { SmmButton } from "@/components/buttons/SmmButton";
import { SmmTextButton } from "@/components/buttons/SmmTextButton";
import SmmTextInput from "@/components/Inputs/SmmTextInput";
import { AuthContext } from "@/contexts/authContext";
import { useFonts } from "expo-font";
import { router } from "expo-router";

import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function SignIn() {
  const { signIn, token } = useContext(AuthContext);
  const { register, control, setValue, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    setIsLoading(true);
    await signIn!(data["phoneNo"]);
    setIsLoading(false);
    router.replace("/");
  };

  const onRegisterClick = () => {
    router.replace("/sign-up");
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
  indicatorStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
