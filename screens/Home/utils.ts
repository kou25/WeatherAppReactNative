import { CurrentWeather, IconsType } from "./types";

export const getIconProps = (iconName: string) => {
  const icon: IconsType =
    iconName == "Clouds"
      ? "cloud"
      : ["Thunderstorm", "Drizzle", "Rain"].includes(iconName)
      ? "rainy"
      : iconName == "Snow"
      ? "snow"
      : "sunny";
  return icon;
};

export const dateToGMT = (date: Date, offset: number) => {
  let hours = date.getUTCHours() + offset;
  if (hours > 23) hours = 24 - hours;
  if (hours < 0) hours = 24 + hours;
  return hours;
};

export const getBackgroundImage: any = (CurrentTemp: CurrentWeather) => {
  if (CurrentTemp) {
    let image = {
      uri: ""
    };
    const getHours = dateToGMT(new Date(), CurrentTemp.timezone / 3600);
    const hours = getHours;
    const isDayTime = hours > 6 && hours < 20;
    const backgroundType = getIconProps(CurrentTemp.weather[0].main);

    if (isDayTime) {
      if (backgroundType === "sunny") {
        image.uri =
          "https://i.pinimg.com/564x/e6/f9/88/e6f988b9307f2abf622edfb1d49fd9e2.jpg";
      } else if (backgroundType === "cloud") {
        image.uri =
          "https://i.pinimg.com/564x/da/b4/10/dab4109d5daf752628ab34d48f4ec1d7.jpg";
      } else if (backgroundType === "rainy") {
        image.uri =
          "https://i.pinimg.com/564x/98/d8/34/98d8343532a5b6466ef761c515a9d5e8.jpg";
      } else {
        image.uri =
          "https://i.pinimg.com/564x/7a/7e/fe/7a7efec7656a6521a5317a68319fc80c.jpg";
      }
    } else {
      if (backgroundType === "sunny") {
        image.uri =
          "https://i.pinimg.com/564x/12/bf/8c/12bf8c61c2193385aa5a3f46a6830d50.jpg";
      } else if (backgroundType === "cloud") {
        image.uri =
          "https://i.pinimg.com/564x/01/32/c2/0132c2024bc49c6b5a859b22c6237f7a.jpg";
      } else if (backgroundType === "rainy") {
        image.uri =
          "https://i.pinimg.com/564x/06/8b/53/068b532e2840ddee9acc5b19bb91c6e6.jpg";
      } else {
        image.uri =
          "https://i.pinimg.com/564x/7a/7e/fe/7a7efec7656a6521a5317a68319fc80c.jpg";
      }
    }
    return image;
  }
};
