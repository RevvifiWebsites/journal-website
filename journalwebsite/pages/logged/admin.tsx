import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Admin() {
  const [user, setUser] = useState({
    username: "Loading...",
    email: "Loading...",
    admin: false,
  });
  const [articles, setArticles] = useState([
    {
      title: "Loading...",
      content: "",
      credit: "",
      id: "",
    },
  ]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
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
        if (!data.admin) {
          window.location.href = "/logged/home";
        }
        setUser(data);
      });
      fetch("/api/getunpublishedarticles", {
        method: "GET",
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
          setArticles(data);
        });
  }, []);
  return (
    <>
      <h1>Admin Panel</h1>
      {articles.map((article) => {
        return (
          <>
            <h2>{article.title}</h2>
            <h3>By {article.credit}</h3>
            <p>{article.content}</p>
            <button
            onClick={() => {
                fetch("/api/deletearticle", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: article.id,
                  }),
                });
              }}
            >delete</button>
            <button
              onClick={() => {
                console.log(article);
                fetch("/api/publisharticle", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: article.id,
                  }),
                });
              }}
            >
              publish
            </button>
          </>
        );
      })}
    </>
  );
}
