import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Login.module.css";
import Navigation from "./sidebar";
import { useState } from "react";
import Popup from "./popup";

export default function Login() {
  const [popup, setPopup] = useState(null as string | null);
  return (
    <div className={styles.container}>
      <Navigation/>
      <Popup popup = {popup} setPopup = {setPopup}/>
      <h2 className="heading-2">Sign Up to <span className="accent-color">young</span>minds.</h2>
      <input type="text" placeholder="Username" id="username"/>
      <input type="password" placeholder="Password" id="password"/>
      <input type="password" placeholder="Repeat Password" id="repeat"/>
      <div className={styles.buttonsContainer}>
        <button className="button-primary" onClick={async  () => {
            const username = (document.getElementById("username") as HTMLInputElement).value;
            const password = (document.getElementById("password") as HTMLInputElement).value;
            const repeat = (document.getElementById("repeat") as HTMLInputElement).value;
            if(password != repeat){
                console.log("Passwords do not match");
                setPopup("Passwords do not match");
              return;
            }
            if(username.length < 4){
              setPopup("Username must be at least 4 characters long");
              return;
            }
            if(password.length < 8){
              setPopup("Password must be at least 8 characters long");
              return;
            }
            const response = await fetch("/api/register", {
              method: "POST",
              body: JSON.stringify({ username, password }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {

              window.location.href = "/login";
            } else {
              setPopup("Username already exists");
            }
        }}>Register</button>
        <button className="button-secondary"><a href = "/login">Login</a></button>
      </div>
    </div>
  );
}
