import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { firebaseApp } from "../firebase/firebase";
import { useLoginUser } from "./useLoginUser";

export const useDataSet = () => {
  const histry = useHistory();
  const [ saveLoad, setSaveLoad ] = useState(false);
  const { loginUser, setLoginUser } = useLoginUser();
  const setNewData = useCallback( async(uid: string | undefined, address: string) => {
    console.log(address);
    const newData = {
      width: 50,
      address: address,
    }
    setLoginUser(newData);

    await firebaseApp.database().ref("users/" + uid).set(newData).then(() => {
      histry.push("/home");
    }).catch(() => alert("データ登録失敗"))
  }, [setLoginUser, histry]);

  const saveData = useCallback(async() => {
    setSaveLoad(true);
     const user = await firebaseApp.auth().currentUser;
     await firebaseApp.database().ref("users/" + user?.uid).set(loginUser).catch(() => alert("データ登録失敗")).finally(() => setSaveLoad(false))
  }, [loginUser])
  return { setNewData, saveData, saveLoad };
}