import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Write.module.css";
import { useState } from "react";
import Markdown from "react-markdown";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    //TODO maybe save this to local storage so that it isn't lost? maybe allow draft saving?
  const [article, setArticle] = useState({ title: "Enter Title", content: "" });
  return (
    <>
      <textarea
        id="title"
        placeholder="title"
        onChange={(e) => {
          setArticle({ ...article, title: e.target.value });
        }}
      ></textarea>
      <textarea
        id="content"
        className={styles.content}
        placeholder="content"
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setArticle({ ...article, content: article.content + "\n" });
            (e.target as HTMLTextAreaElement).value = article.content + "\n";
          }
        }}
        onChange={(e) => {
          setArticle({ ...article, content: e.target.value });
        }}
      ></textarea>
      <button onClick={(e) => {
        if(article.title == "Enter Title" || article.content == ""){
            //TODO pop error?
            return;
        }
        fetch("/api/addarticle", {
          method: "POST",
          body: JSON.stringify(article),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }}>Publish</button>
      <h1>{article.title}</h1>
      <Markdown>{article.content.replaceAll("\n", "\n")}</Markdown>
    </>
  );
}
