import firebase from "./firebase";

export const getDatabase = () => {
  firebase.database().ref("/users").once("value", (snapshot: any) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    }
    else {
      console.log("No data available");
    }
  }).catch(function(error) {
    console.error(error);
  });
};