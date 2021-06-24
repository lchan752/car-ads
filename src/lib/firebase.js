import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
  apiKey: "AIzaSyCE6FtoHcZch1Zmdu0uytDFkfnyfooJQVI",
  authDomain: "car-ads-leo.firebaseapp.com",
  projectId: "car-ads-leo",
  storageBucket: "car-ads-leo.appspot.com",
  messagingSenderId: "93428346535",
  appId: "1:93428346535:web:13372b72817759dbf2f582"
});

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();