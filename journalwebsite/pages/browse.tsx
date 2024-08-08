import { useEffect, useState } from "react";
import Navigation from "./sidebar";
import styles from "../styles/Browse.module.css";
import Articlebox from "./articlebox";
import FunFacts from "./FunFacts";

export default function Browse() {
  const [articles, setArticles] = useState([{
    id: "",
    title: "Loading...",
    credit: "Loading...",
    file: null,
  }]);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    fetch("/api/getarticlelist")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticles(data);
      })

  }, []);
  return (
    <div className={styles.container}>
      <Navigation/>
      <div>
        <h1 className="heading-2">Browse Researches</h1>
        <ol className={styles.articleList}>
        {
          articles.map((article) => {
            return <Articlebox key={article.id} id={article.id} title={article.title}  credit={article.credit} />
          })
        }
        </ol>
        <button onClick={() => {
          setFetching(true);
          fetch("/api/getarticlelist", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              start: articles.length,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              setArticles(articles.concat(data));
              setFetching(false);
            });
        }} className= {styles.button}>Load More
        </button>
      </div>
      <FunFacts/>
    </div>
  )
}
