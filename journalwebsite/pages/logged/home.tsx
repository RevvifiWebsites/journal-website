import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    if(localStorage.getItem('token')){
      window.location.href = "/logged/home";
    }
  }, [])
  return (
    <>
    Your logged in!
    <a href = "/logged/writearticle">write an article</a>
    <a href = "/browse">browse articles</a>
    </>
  );
}
