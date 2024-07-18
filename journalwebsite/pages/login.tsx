import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
export default function Login() {
  return (
    <>
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
    }}>login</button>
    </>
  );
}
