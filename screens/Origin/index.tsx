import {
  View,
  Button,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  StatusBar
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setOrigin } from "../../slices/originSlice";

const Origin = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <StatusBar barStyle="dark-content" />
      <View style={tw`mt-5`}>
        <TextInput
          style={tw`w-[90%] h-[50px] mx-5 px-5 border border-gray-300 rounded-xl`}
          onChangeText={setLocation}
          value={location}
          placeholder="Enter location..."
        />
      </View>
      <View style={tw`mt-5  flex items-center`}>
        <TouchableHighlight
          style={tw`border ${
            location == "" ? "border-gray-200" : "border-blue-300"
          } w-[30%] rounded-xl`}
        >
          <Button
            onPress={() => {
              dispatch(setOrigin(location));
              navigation.push("Home");
            }}
            title="Submit"
            disabled={location === ""}
            accessibilityLabel="Learn more about this button"
          />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default Origin;
