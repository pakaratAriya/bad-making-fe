import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export default function SmmFloatingButton(props: {
  onPress: () => void;
  size?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}) {
  return (
    <Pressable onPress={props.onPress}>
      <View
        style={{
          position: "static",
          top: props.top,
          bottom: props.bottom,
          left: props.left,
          right: props.right,
          width: props.size ?? 24,
          height: props.size ?? 24,
        }}
      >
        <Ionicons name="arrow-undo-outline" size={props.size ?? 24} />
      </View>
    </Pressable>
  );
}
