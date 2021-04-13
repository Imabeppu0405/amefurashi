import { useCallback, useState } from "react";
import { firebaseApp } from "../firebase/firebase";
import { useLoginUser } from "./useLoginUser";
import { useWeatherGet } from "./useWeatherGet";

export const useUserData = () => {
  const [ homeLoad, setHomeLoad ] = useState(false);
  const { setLoginUser } = useLoginUser();
  const { getWeather } = useWeatherGet();
  const getUserData = useCallback(() => {
    setHomeLoad(true);
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUID = user.uid;
         firebaseApp.database().ref("users/" + currentUID).get().then((snapshot) => {
          const data = snapshot.val();
          if ( data !== null ) {
            setLoginUser(data);
            getWeather(data.address);
          } 
        }).finally(() => setHomeLoad(false));
      } else {
        console.log("ログアウト中");
      }
    })
  }, [setLoginUser, getWeather, setHomeLoad]);
  return { getUserData, setHomeLoad, homeLoad };
}