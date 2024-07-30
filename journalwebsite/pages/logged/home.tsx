import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import SideBar from "../sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState({
    username: "Loading...",
    email: "Loading...",
    admin: false,
  });
  console.log(user);
  useEffect(() => {
    if(localStorage.getItem('token')){
      window.location.href = "/logged/home";
    }
    fetch("/api/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setUser(data);
      });
  }, [])
  return (
    <>
    <SideBar/>
    Your logged in!
    <a href = "/logged/writearticle">write an article</a>
    <a href = "/browse">browse articles</a>
    {user.admin && <a href = "/logged/admin">admin panel</a>}
    </>
  );
}
