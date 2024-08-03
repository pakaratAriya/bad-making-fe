import SmmAppTitle from "@/components/SmmAppTitle";
import { SmmButton } from "@/components/buttons/SmmButton";
import SmmRadioGroup from "@/components/Inputs/SmmRadioGroup";
import SmmTextInput from "@/components/Inputs/SmmTextInput";
import { SmmFontFamily } from "@/constants/Typography";
import { AuthContext } from "@/contexts/authContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";
import SmmFloatingButton from "@/components/buttons/SmmFloatingButton";
import { router } from "expo-router";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const { control, handleSubmit } = useForm();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | "others"
  >("male");
  const onSubmit = async (data: FieldValues) => {
    signUp!(data["phoneNo"]!, data["nickname"], selectedDate, selectedGender);
    router.replace("/");
  };

  const onClickBack = () => {
    router.replace("sign-in");
  };

  return (
    <View style={styles.container}>
      <SmmFloatingButton onPress={onClickBack} top={0} left={0} />
      <SmmAppTitle />
      <SmmTextInput
        label="Phone Number *"
        name="phoneNo"
        control={control}
        keyboardType="phone-pad"
        required={true}
      />
      <SmmTextInput
        label="Nickname *"
        name="nickname"
        control={control}
        keyboardType="default"
        required={true}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Birth's Date * </Text>

        <Pressable
          onPress={() => {
            setCalendarOpen(true);
          }}
        >
          <TextInput
            style={[styles.input, styles.input]}
            value={selectedDate.toDateString()}
            editable={false}
            selectTextOnFocus={false}
          />
        </Pressable>
      </View>
      {calendarOpen && (
        <DateTimePicker
          value={selectedDate}
          onChange={(e, value) => {
            setSelectedDate(value ?? selectedDate);
            setCalendarOpen(false);
          }}
          maximumDate={new Date()}
          minimumDate={new Date(1950, 0, 1)}
        />
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <SmmRadioGroup
          radioButtons={[
            { id: "male", value: "male", label: "male" },
            { id: "female", value: "female", label: "female" },
            { id: "others", value: "others", label: "others" },
          ]}
          onPress={(value) => {
            if (value === "male") setSelectedGender(value);
            else if (value === "female") setSelectedGender(value);
            else setSelectedGender("others");
          }}
          selectedId={selectedGender}
          labelStyle={styles.radioText}
          layout="row"
          containerStyle={styles.radioContainer}
        />
      </View>
      <SmmButton title="Create Account" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "gray",
    margin: 0,
    marginLeft: 0,
    fontSize: 12,
    fontFamily: SmmFontFamily.InknutAntiquaRegular,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
  },
  container: {
    paddingTop: 8,
    padding: 8,
    backgroundColor: "white",
  },
  inputContainer: { width: "80%", marginHorizontal: "auto" },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    height: 40,
    padding: 10,
    borderRadius: 0,
    color: "black",
  },
  radioContainer: {
    justifyContent: "space-between",
  },
  radioText: {
    color: "black",
    fontFamily: SmmFontFamily.InknutAntiquaRegular,
  },
});
