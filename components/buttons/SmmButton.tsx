import { SmmFontFamily } from "@/constants/Typography";
import { ButtonProps, Pressable, StyleSheet, Text, View } from "react-native";

export function SmmButton(props: ButtonProps) {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.innerButton}>{props.title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {},
  innerButton: {
    color: "white",
    fontFamily: SmmFontFamily.InknutAntiquaBold,
    fontSize: 18,
    lineHeight: 40,
    textAlign: "center",
  },
  button: {
    marginTop: 40,
    height: 40,
    backgroundColor: "#35B81F",
    width: "60%",
    marginHorizontal: "auto",
  },
});
