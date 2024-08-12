import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Admin.module.css";
import { useEffect, useState } from "react";
import SideBar from "../sidebar";
import PDFViewer from "../pdfviewer";
import FunFacts from "../FunFacts";

export default function Admin() {
  const [stats, setStats] = useState({
    articles: 0,
    unpublished: 0,
    facts: 0,
    unpublishedfacts: 0,
    numusers: 0,
  });
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
      createdAt: "",
      file: "",
    },
  ]);
  useEffect(() => {
    fetch("/api/getstats", {
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
        setStats(data);
      });
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: 0,
        take: 5,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(async (data) => {
        for (let i = 0; i < data.length; i++) {
          // data[i].file =await (await fetch((await ((await fetch(`/api/getpdf?id=${data[i].id}`)).json())).url)).text();
        }
        setArticles(data);
      });
  }, []);
  return (
    <div>
      <SideBar />
      <div className={styles.page}>
        <h1 className="heading-2">Dashboard</h1>
        <p>
          {" "}
          Welcome <span style={{ color: "#FD7E14" }}>{user.username}</span>,
          everything looks great!
        </p>

        {/* Admin Page Stats */}
        <div className={styles.statchips}>
          <div className={styles.statchip}>
            <div className={styles.textchip}>
              <h2>{stats?.articles}</h2>
              <p>Articles</p>
            </div>
            <Image
              src="/images/articlechip.svg"
              alt="graph bars"
              width={200}
              height={200}
              className={styles.statimage}
            ></Image>
          </div>
          <div className={styles.statchip}>
            <div className={styles.textchip}>
              <h2>{stats?.unpublished} </h2>
              <p>Unpublished Articles</p>
            </div>
            <Image
              src="/images/unpublishedchip.svg"
              alt="graph bars with glass"
              width={200}
              height={200}
              className={styles.statimage}
            ></Image>
          </div>
          <div className={styles.statchip}>
            <div className={styles.textchip}>
              <h2>{stats?.facts}</h2>
              <p>Total Facts</p>
            </div>
            <Image
              src="/images/factschip.svg"
              alt="Info I"
              width={200}
              height={200}
              className={styles.statimage}
            ></Image>
          </div>
          <div className={styles.statchip}>
            <div className={styles.textchip}>
              <h2>{stats.unpublishedfacts}</h2>
              <p>Unpublished Facts</p>
            </div>
            <Image
              src="/images/unpublishedfactschip.svg"
              alt="graph bars with glass"
              width={200}
              height={200}
              className={styles.statimage}
            ></Image>
          </div>
          <div className={styles.statchip}>
            <div className={styles.textchip}>
              <h2> {stats?.numusers}</h2>
              <p>Total Users</p>
            </div>
            <Image
              src="/images/userchip.svg"
              alt="graph bars with glass"
              width={200}
              height={200}
              className={styles.statimage}
            ></Image>
          </div>
        </div>

        <div className={styles.maincontent}>
          {/* Unpublished Articles */}
          <div>
            <h1 className="heading-2">Unpublished Articles</h1>
            <div className={styles.articles}>
              {articles.map((article, index) => {
                return (
                  <div
                    className={styles.article}
                    onClick={() => {
                      window.location.href = `/article/${article.id}`;
                    }}
                    key={index}
                  >
                    <PDFViewer
                      file={article.file}
                      contstile={styles.pdf}
                      overflow="hidden"
                      nostacked
                      canvasstyle={styles.canvaspdf}
                    ></PDFViewer>
                    <div className={styles.articleinfo}>
                      <h3 className="body-bold">
                        {article.title.substring(0, 250) +
                          (article.title.length > 250 ? "... " : "")}
                      </h3>
                      <p className="body-secondary">{article.credit}</p>
                      <p className="body-secondary">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
              <button className={styles.loadmore}>Load More</button>
            </div>
          </div>

          {/* Fun Facts */}
          <div className={styles.factslist}>
            {/* <FunFacts admin published width="50vw" /> */}
            <FunFacts admin />
          </div>
        </div>
      </div>
    </div>
  );
}
