import { useEffect, useState } from "react";
import SideBar from "./sidebar";

export default function Browse() {
  const [articles, setArticles] = useState([ {
    id: 0,
    title: "Loading...",
    content: "Loading...",
  }]);
  useEffect(() => {
    fetch("/api/getarticlelist")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticles(data);
      })
  }, []);
  return <>
  <SideBar/>
  {
    articles.map((article) => {
      return <div key={article.id} onClick={() => {
        window.location.href = "/article/" + article.id;
      }}>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </div>;
    })
  }</>;
}
