import { PropsWithChildren } from "react";
import { Pressable, TextStyle, View } from "react-native";

export default function SmmFlexButton(
  props: PropsWithChildren & {
    onPress: () => void;
    size?: number;
    buttonStyle?: TextStyle;
  }
) {
  return (
    <Pressable onPress={props.onPress}>
      <View style={props.buttonStyle}>{props.children}</View>
    </Pressable>
  );
}
