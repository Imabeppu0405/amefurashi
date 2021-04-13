import { useCallback, useState } from "react"
import { useHistory } from "react-router"
import { firebaseApp } from "../firebase/firebase";
import { useDataSet } from "./useDataSet";


export const useAuth = () => {
  const histry = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { setNewData } = useDataSet();

  const login = useCallback((mail: string, password: string) => {
    setLoading(true);
    setErrorMessage(false);
    firebaseApp.auth().signInWithEmailAndPassword(mail, password).then((userCrudential) => {
      histry.push("/home");
    }).catch(() => setErrorMessage(true)).finally(() => setLoading(false))
  }, [histry]);

  const signUp = useCallback((mail: string, password: string, address: string) => {
    setLoading(true);
    setErrorMessage(false);
    firebaseApp.auth().createUserWithEmailAndPassword(mail, password).then((userCredential) => {
      setNewData(userCredential.user?.uid, address);
      histry.push("/home");
    }).catch(() => setErrorMessage(true)).finally(() => setLoading(false))
  }, [setNewData, histry]);

  const logout = useCallback(() => {
    firebaseApp.auth().signOut().then(() => {
      histry.push("/");
    }).catch(() => alert("ログアウトエラー"))
  }, [histry]);

  return { login, signUp,　logout, loading, errorMessage }
}