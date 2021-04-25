import axios from "axios";
import { useCallback, useState } from "react";
import { firebaseApp } from "../firebase/firebase";
import { useLoginUser } from "./useLoginUser";
import { useMessage } from "./useMessage";

export const useUserData = () => {
  const [ homeLoad, setHomeLoad ] = useState(false);
  const [ weather, setWeather ] = useState("");
  const { setLoginUser } = useLoginUser();
  const { showMessage } = useMessage();
  const getUserData = useCallback(async() => {
    setHomeLoad(true);
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUID = user.uid;
         firebaseApp.database().ref("users/" + currentUID).get().then(async(snapshot) => {
          const data = snapshot.val();
          if ( data !== null ) {
            setLoginUser(data);
            const key = process.env.REACT_APP_OPENWEATHER_KEY;
            const geo = await axios.get(`https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${data.address}`);
            const lon = geo.data.response.location[0].x;
            const lat = geo.data.response.location[0].y;
            const weather= await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
            const nowWeather = weather.data.weather[0].main;
            setWeather(nowWeather);
            if (nowWeather === "Rain" || nowWeather === "Snow") {
              showMessage({ title: "現在の天気は雨です！", status: "info", description: "成長ボーナス　＋10%" });
            } else if (nowWeather === "Clear") {
              showMessage({ title: "現在の天気は晴れです", status: "info", description: "成長ボーナス　＋3%" });
            } else {
              showMessage({ title: "現在の天気は曇りです", status: "info", description: "成長ボーナス　＋3%" });
            }
          } 
        }).finally(() => setHomeLoad(false));
      }
    })
  }, [setLoginUser, setHomeLoad, setWeather, showMessage]);

  const getUserSettingData = useCallback(() => {
    setHomeLoad(true);
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUID = user.uid;
         firebaseApp.database().ref("users/" + currentUID).get().then((snapshot) => {
          const data = snapshot.val();
          if ( data !== null ) {
            setLoginUser(data);
          } 
        }).finally(() => setHomeLoad(false));
      }
    })
  }, [setLoginUser, setHomeLoad]);
  return { getUserData, setHomeLoad, homeLoad, getUserSettingData, weather };
}