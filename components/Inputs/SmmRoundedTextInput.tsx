import { StyleSheet } from "react-native";
import SmmTextInput from "./SmmTextInput";
import { SmmTextInputType } from "./SmmTextInputType";

export default function SmmRoundedTextInput(props: SmmTextInputType) {
  return (
    <SmmTextInput
      {...props}
      textInputStyle={styles.customStyle}
      labelCustomStyle={styles.labelCustomStyle}
    />
  );
}

const styles = StyleSheet.create({
  customStyle: {
    borderRadius: 20,
    borderColor: "#35B81F",
    textAlign: "center",
  },
  labelCustomStyle: {
    textAlign: "center",
  },
});
