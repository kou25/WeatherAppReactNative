import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
//@ts-ignore
import { API_TOKEN, FORCAST_API, WEATHER_API } from "@env";
import axios from "axios";
import * as Location from "expo-location";
import { Coordinates, CurrentWeather, WeatherInfoProps } from "./types";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigation } from "@react-navigation/native";
import ItemList from "./ItemList";
import { getBackgroundImage } from "./utils";

export default function Home() {
  const navigation = useNavigation<any>();
  const [loading, SetLoading] = useState<boolean>(false);
  const [Cordinates, SetCordinates] = useState<Coordinates>();
  const [WeatherInfo, SetWeatherInfo] = useState<WeatherInfoProps>();
  const [CurrentTemp, SetCurrentTemp] = useState<CurrentWeather>();
  const location = useSelector((state: RootState) => state.country.value);

  useEffect(() => {
    (async () => {
      SetLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      SetCordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    })();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (Cordinates || location) {
        try {
          const urlCurrent = `${WEATHER_API}?${
            location
              ? `q=${location}`
              : `lat=${Cordinates?.latitude}&lon=${Cordinates?.longitude}`
          }&units=metric&appid=${API_TOKEN}`;
          const url = `${FORCAST_API}?${
            location
              ? `q=${location}`
              : `lat=${Cordinates?.latitude}&lon=${Cordinates?.longitude}`
          }&units=metric&appid=${API_TOKEN}`;
          const currentResponse = await axios.get(urlCurrent);
          const response = await axios.get(url);
          SetCurrentTemp(currentResponse?.data);
          SetWeatherInfo(response.data);
          SetLoading(false);
        } catch (error) {
          console.log(error);
          SetLoading(false);
        }
      }
    };
    fetchUsers();
  }, [FORCAST_API, API_TOKEN, Cordinates, location]);

  if (loading) {
    return (
      <SafeAreaView>
        <View style={tw`flex justify-center h-[100%] items-center`}>
          <LottieView
            source={require("./loader.json")}
            autoPlay
            style={tw`w-40 h-40`}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <StatusBar barStyle="light-content" />
      {CurrentTemp && (
        <View style={tw`h-[70%] `}>
          <ImageBackground
            source={getBackgroundImage(CurrentTemp)}
            resizeMode="cover"
            style={tw`flex-1 `}
          >
            <SafeAreaView>
              <View style={tw`flex justify-center h-[70%]`}>
                <View style={tw`ml-8`}>
                  <Text
                    style={tw`text-2xl font-semibold tracking-wider text-white capitalize`}
                  >
                    {CurrentTemp?.weather[0]?.description}
                  </Text>

                  <Text style={tw`text-[64px] mt-2 font-bold  text-white `}>
                    {Math.floor(CurrentTemp.main.temp)}°
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>
      )}
      <View style={tw`flex px-4 justify-center bg-white h-[30%] relative`}>
        <View style={tw`absolute -top-8 right-5`}>
          <TouchableOpacity
            style={tw`flex justify-center items-center w-15 h-15 bg-white text-black rounded-full shadow-lg `}
            onPress={() => navigation.push("Origin")}
          >
            <View>
              <Ionicons name="ios-location-outline" size={24} color="indigo" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`font-semibold text-xl`}>Today</Text>

          <Text
            style={tw`font-semibold text-xl text-indigo-800`}
          >{`${WeatherInfo?.city?.name}, ${WeatherInfo?.city?.country}`}</Text>
        </View>
        {/* weather list */}
        <ItemList WeatherInfo={WeatherInfo!} />
      </View>
      <View></View>
    </View>
  );
}
