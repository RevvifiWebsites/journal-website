import { useEffect, useState } from "react";
import SideBar from "./sidebar";
import styles from "../styles/Browse.module.css";
import Articlebox from "./articlebox";
export default function Browse() {
  const [articles, setArticles] = useState([ {
    id: "",
    title: "Loading...",
    content: "Loading...",
    credit: "Loading...",
    file: null,
  }]);
  useEffect(() => {
    fetch("/api/getarticlelist")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //flip the array
        data = data.reverse();
        setArticles(data);
      })
  }, []);
  return <>
  <SideBar/>
  <ol className={styles.articleList}>
  {
    articles.map((article) => {
      return <Articlebox key={article.id} id={article.id} title={article.title} content={article.content} credit={article.credit} />
    })
  }
  </ol>
  </>;
}
