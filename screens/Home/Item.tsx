import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { getIconProps } from "./utils";

type Props = {
  time: string;
  temp: number;
  icon: string;
};
const Item = ({ time, temp, icon }: Props) => {
  return (
    <View style={tw`mr-10 flex items-center w-[60px]`}>
      <Text
        style={tw`font-semibold text-lg text-slate-500
     `}
      >
        {moment(time).format("HH A")}
      </Text>
      <Ionicons
        name={`${getIconProps(icon)}-outline`}
        size={34}
        color="indigo"
      />
      <Text style={tw`font-semibold text-lg text-slate-500`}>
        {`${Math.floor(temp)}°`}
      </Text>
    </View>
  );
};

export default Item;
