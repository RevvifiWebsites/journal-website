import { useEffect, useState } from "react";

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
  return <>{
    articles.map((article) => {
      return <div key={article.id}>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </div>;
    })
  }</>;
}
