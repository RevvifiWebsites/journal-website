import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Write.module.css";
import { useState } from "react";
import Markdown from "react-markdown";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    //TODO maybe save this to local storage so that it isn't lost? maybe allow draft saving?
  const [article, setArticle] = useState({ title: "Enter Title", content: "", authors: "" });
  return (
    <>
      <textarea
        id="title"
        placeholder="title"
        onChange={(e) => {
          setArticle({ ...article, title: e.target.value });
        }}
      ></textarea>
      <textarea id = "authors" placeholder="authors (defaults to username) " onChange={() => {
        setArticle({...article, authors: (document.getElementById("authors") as HTMLTextAreaElement).value});
      }} >
      </textarea>
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
      <button onClick={async (e) => {
        if(article.title == "Enter Title" || article.content == ""){
            //TODO pop error?
            return;
        }
        const res =await  fetch("/api/addarticle", {
          method: "POST",
          body: JSON.stringify(article),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      window.location.href = "/article/" + res.id;
      }}>Publish</button>
      <h1>{article.title}</h1>
      <Markdown>{article.content.replaceAll("\n", "\n")}</Markdown>
      <br/>
    </>
  );
}
