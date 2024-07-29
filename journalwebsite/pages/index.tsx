import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";


export default function Home() {
  return (
    <>
    <h1> this still needs to be styled</h1>
      <a href = "/login">login</a>
      <a href = "/register">register</a>
      <a href = "/logged/addarticle">add article</a>
    </>
  );
}
