import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
export default function Login() {
  return (
    <>
    <input type="text" placeholder="username" id = "username"/>
    <input type="password" placeholder="password" id = "password"/>
    <input type="password" placeholder="repeatpassword" id = "repeat"/>
    <a href = "/login">login</a>
    <button onClick={async  () => {
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const repeat = (document.getElementById("repeat") as HTMLInputElement).value;
        if(password != repeat){
            console.log("Passwords do not match");
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
          console.log("error");
          //todo add error message
        }
    }}>register</button>
    </>
  );
}
