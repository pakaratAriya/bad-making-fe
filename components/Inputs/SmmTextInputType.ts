import { Control, FieldValues, ValidationRule } from "react-hook-form";
import { KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";

export type SmmTextInputType = {
  label: string;
  control?: Control<FieldValues>;
  name: string;
  keyboardType?: KeyboardTypeOptions;
  required?: string | ValidationRule<boolean> | undefined;
  textInputStyle?: TextStyle;
  placeholder?: string;
  labelCustomStyle?: TextStyle;
};
