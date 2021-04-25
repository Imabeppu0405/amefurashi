import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { firebaseApp } from "../firebase/firebase";
import { useLoginUser } from "./useLoginUser";
import { useMessage } from "./useMessage";

export const useDataSet = () => {
  const histry = useHistory();
  const [ saveLoad, setSaveLoad ] = useState(false);
  const { loginUser, setLoginUser } = useLoginUser();
  const { showMessage } = useMessage();
  const setNewData = useCallback( async(uid: string | undefined, address: string) => {
    const newData = {
      name: "あめふらし",
      width: 100,
      address: address,
    }
    setLoginUser(newData);

    await firebaseApp.database().ref("users/" + uid).set(newData).then(() => {
      histry.push("/home");
    }).catch(() => showMessage({ title: "データ登録に失敗しました", status: "error" }))
  }, [setLoginUser, histry, showMessage]);

  const saveData = useCallback(async() => {
    setSaveLoad(true);
     const user = await firebaseApp.auth().currentUser;
     await firebaseApp.database().ref("users/" + user?.uid).set(loginUser).then(() => {
      showMessage({ title: "成長を記録しました", status: "success" })
     }).catch(() => showMessage({ title: "成長が記録できませんでした", status: "error" })).finally(() => setSaveLoad(false))
  }, [loginUser, showMessage])

  const saveSettingData = useCallback(async(name: string, address: string) => {
    setSaveLoad(true);
    if ( address !== "" ) {
      const geo = await axios.get(`https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${address}`);
      if (geo.data.response.error) {
        showMessage({ title: "不正な郵便番号です", status: "error" });
        setSaveLoad(false);
        return;
      }
    }
    if ( loginUser !== null ) {
      const newData = {
        name: name === "" ? loginUser?.name : name,
        address: address === "" ? loginUser?.address : address,
        width: loginUser?.width
      }
        setLoginUser(newData);
  
        const user = await firebaseApp.auth().currentUser;
        await firebaseApp.database().ref("users/" + user?.uid).set(newData).then(() => {
        showMessage({ title: "変更を保存しました", status: "success" })
       }).catch(() => showMessage({ title: "変更が保存できませんでした", status: "error" })).finally(() => setSaveLoad(false))
    }
  }, [loginUser, showMessage, setLoginUser])
  return { setNewData, saveData, saveLoad, saveSettingData };
}