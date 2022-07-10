import { View, Text, FlatList } from "react-native";
import React from "react";
import tw from "twrnc";
import { WeatherInfoProps } from "./types";
import Item from "./Item";

type Props = {
  WeatherInfo: WeatherInfoProps;
};
const ItemList = ({ WeatherInfo }: Props) => {
  return (
    <View style={tw`mt-4`}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={WeatherInfo?.list.slice(0, 8)}
        renderItem={({ item }) => (
          <Item
            time={item.dt_txt}
            temp={item.main.temp}
            icon={item.weather[0].main}
          />
        )}
        keyExtractor={(item) => item.dt_txt}
      />
    </View>
  );
};

export default ItemList;
