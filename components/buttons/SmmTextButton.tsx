import { SmmFontFamily } from "@/constants/Typography";
import { ButtonProps, Pressable, StyleSheet, Text } from "react-native";

export function SmmTextButton(props: ButtonProps) {
  return (
    <Pressable onPress={props.onPress}>
      <Text style={styles.innerButton}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {},
  innerButton: {
    marginTop: 20,
    color: "#0038FE",
    opacity: 0.38,
    fontFamily: SmmFontFamily.InknutAntiquaBold,
    fontSize: 10,
    textAlign: "center",
  },
});
