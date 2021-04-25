import axios from "axios";
import { useCallback, useState } from "react"
import { useHistory } from "react-router"
import { firebaseApp } from "../firebase/firebase";
import { useDataSet } from "./useDataSet";
import { useMessage } from "./useMessage";


export const useAuth = () => {
  const histry = useHistory();
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();
  const { setNewData } = useDataSet();

  const login = useCallback((mail: string, password: string) => {
    setLoading(true);
    firebaseApp.auth().signInWithEmailAndPassword(mail, password).then((userCrudential) => {
      setLoading(false);
      showMessage({ title: "ログインしました", status: "success" });
      histry.push("/home");
    }).catch(() => { 
      showMessage({ title: "ログインに失敗しました", status: "error" });
      setLoading(false);
    }).finally(() => {
    })
  }, [histry, showMessage]);

  const signUp = useCallback(async(mail: string, password: string, address: string) => {
    setLoading(true);
    const geo = await axios.get(`https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${address}`);
    if (geo.data.response.error) {
      showMessage({ title: "不正な郵便番号です", status: "error" });
      setLoading(false);
      return;
    }
    firebaseApp.auth().createUserWithEmailAndPassword(mail, password).then(async(userCredential) => {
      setLoading(false);
      await setNewData(userCredential.user?.uid, address);
      showMessage({ title: "あめふらしが誕生しました", status: "success" });
      histry.push("/home");
    }).catch(() => {
      showMessage({ title: "新規登録に失敗しました", status: "error" });
      setLoading(false);
    })
  }, [setNewData, histry, showMessage]);

  const logout = useCallback(() => {
    firebaseApp.auth().signOut().then(() => {
      showMessage({ title: "ログアウトしました", status: "success" });
      histry.push("/");
    }).catch(() => showMessage({ title: "ログアウトに失敗しました", status: "error" }))
  }, [histry, showMessage]);

  return { login, signUp,　logout, loading }
}