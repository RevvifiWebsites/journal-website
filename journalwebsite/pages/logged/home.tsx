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
  useEffect(() => {
    if(document.cookie.indexOf("id") == -1){
      window.location.href = "/login";
    }
    else {
      window.location.href = `/user/${document.cookie.split("id=")[1].split(";")[0]}`;
    }
  }, [])
  return (
    <>
    </>
  );
}
