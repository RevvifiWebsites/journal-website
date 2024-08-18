import { useEffect, useState } from "react";
import Navigation from "./sidebar";
import styles from "../styles/Browse.module.css";
import Articlebox from "./articlebox";
import FunFacts from "./FunFacts";
import { useSearchParams } from "next/navigation";
export default function Browse() {
  function loadMore() {
    setFetching(true);
    setArticles(
      articles.filter((e) => {
        return !e.title.includes("Loading...") && !e.title.includes("No more articles found");
      }).concat([
        {
          id: "",
          title: "Loading...  ",
          credit: "",
          file: null,
          special: true,
        },
      ])
    );
    if (!fetching) {
      fetch("/api/getarticlelist", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          search: search || "",
          start: articles.filter((e) => {
            return (
              e.title.toUpperCase().includes(search.toUpperCase()) ||
              e.credit.toUpperCase().includes(search.toUpperCase())
            );
          }).length,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.length == 0) {
            setArticles(
              articles.filter((e) => {
                return !e.title.includes("Loading...") && !e.title.includes("No more articles found");
              }).concat([
                {
                  id: "",
                  title: "No more articles found",
                  credit: "No more articles found",
                  file: null,
                  special: true,
                },
              ])
            );
          } else {
            setArticles(articles.concat(data));
          }
          setFetching(false);
        });
    }
  }
  const [articles, setArticles] = useState([
    {
      id: "",
      title: "Loading...",
      credit: "Loading...",
      file: null,
      special: false,
    },
  ]);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    let search = searchParams.get("search");
    fetch("/api/getarticlelist", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        search: search || "",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticles(data);
      });
  }, []);
  useEffect(() => {
    if (!fetching) {
      if (
        articles.filter(
          (article) =>
            article.title.toUpperCase().includes(search.toUpperCase()) ||
            article.credit.toUpperCase().includes(search.toUpperCase())
        ).length == 0
      ) {
        loadMore();
      }
    }
  }, [search]);
  return (
    <div className={styles.container}>
      <Navigation />
      <div>
        <h1 className="heading-2">Browse Researches</h1>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchBar}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <ol className={styles.articleList}>
          {articles.map((article) => {
            if (
              article.title.toUpperCase().includes(search.toUpperCase()) ||
              article.credit.toUpperCase().includes(search.toUpperCase()) || (article.special && articles.filter((e) => {return e.title.toUpperCase().includes(search.toUpperCase()) || e.credit.toUpperCase().includes(search.toUpperCase())}).length == 0)
            ) {
              return (
                article.special  ? <h2 style = {{
                  textAlign: "center",
                  fontSize: "2em",
                  width: "70ch",
                }}> {article.title}</h2> :
                <div
                  style={{
                    width: "70ch",
                  }}
                >
                  <Articlebox
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    credit={article.credit}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </ol>
        <button
          onClick={() => {
            loadMore();
          }}
          className={styles.button}
        >
          Load More
        </button>
      </div>
      <FunFacts take={30} />
    </div>
  );
}
