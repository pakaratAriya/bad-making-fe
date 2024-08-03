import { Controller } from "react-hook-form";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StyleProp,
  TextStyle,
} from "react-native";
import { SmmTextInputType } from "./SmmTextInputType";
import { SmmFontFamily } from "@/constants/Typography";
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function SmmTextInput(props: SmmTextInputType) {
  const {
    control,
    label,
    name,
    keyboardType,
    required,
    textInputStyle,
    placeholder,
    labelCustomStyle,
  } = props;
  const customInputStyle: StyleProp<TextStyle> = textInputStyle ?? {};
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.label, ...labelCustomStyle }}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ ...styles.input, ...customInputStyle }}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor={"rgba(3, 3, 3, 0.3)"}
            multiline={true}
            numberOfLines={1}
          />
        )}
        rules={{ required: required }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "80%", marginHorizontal: "auto" },
  label: {
    color: "gray",
    margin: 0,
    marginLeft: 0,
    fontSize: 12,
    fontFamily: SmmFontFamily.InknutAntiquaRegular,
  },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    height: 40,
    padding: 10,
    borderRadius: 0,
  },
});
