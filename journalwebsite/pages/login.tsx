import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Login.module.css";
import { useState } from "react";
import Navigation from "./sidebar";

export default function Login( props : {rus : boolean}) {
  const [message, setMSG] = useState("");
  return (
    <div className={styles.container}>
    <Navigation rus = {props.rus}/>
      {/* <img src="/images/BG.png" className="background-image" /> */}
      <h1>{message}</h1>
      <h2 className="heading-2">Login to <span className="accent-color">young</span>minds.</h2>
      <input type="text" placeholder="Enter Username" id="username"/>
      <input type="password" placeholder="Enter Password" id="password"/>

      <div className={styles.buttonsContainer}>
        <button className="button-secondary"><a href = "/register">Register</a></button>
        <button className="button-primary" onClick={async  () => {
            const username = (document.getElementById("username") as HTMLInputElement).value;
            const password = (document.getElementById("password") as HTMLInputElement).value;
            const response = await fetch("/api/login", {
              method: "POST",
              body: JSON.stringify({ username, password }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {
              setMSG("Logged in");
              window.location.href = "/";
            } else {
              setMSG(JSON.parse(await response.text()).message);
            }
        }}>Login</button>
      </div>
      
    </div>
  );
}
