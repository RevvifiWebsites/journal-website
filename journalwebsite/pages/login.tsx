import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
export default function Login() {
  const [message, setMSG] = useState("");
  return (
    <>
    <h1>{message}</h1>
    <input type="text" placeholder="username" id = "username"/>
    <input type="password" placeholder="password" id = "password"/>
    <a href = "/register">register</a>
    <button onClick={async  () => {
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
          window.location.href = "/logged/home";
        } else {
          setMSG(JSON.parse(await response.text()).message);
        }
    }}>login</button>
    </>
  );
}
