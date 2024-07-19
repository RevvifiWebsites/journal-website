import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export default function Home() {
  const [article, setArticle] = useState({
    title: "Loading...",
    content: "",
    credit: "",
  });
  const router = useRouter();
  const [comments, setComments] = useState([
    {
      authorName:"Loading...",
      content:"Loading...",
    }
  ]);
  const [comment, setComment] = useState("");
  const { id } = router.query;
  useEffect(() => {
    if(id == undefined){
      return;
    }
    fetch(`/api/getcomments?id=${id}`, {
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
        setComments(data);
      })
    fetch(`/api/getarticle?id=${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          window.location.href = "/404";
        }
      })
      .then((data) => {
        setArticle(data);
      })
  }, [id]);
  return (
    <>
      {article.title}
      <h2>By {article.credit}</h2>
      <Markdown>{article.content}</Markdown>
      <textarea placeholder="add comment" onChange={(e) =>{
        setComment(e.target.value);
      }}>
      </textarea>
      {comments.map((comment) => {
        console.log(comment);
        return <div>
          <h3>{comment.authorName}</h3>
          <p>{comment.content}</p>
          </div>;
      })}
      <button onClick={() => {
        if(document.cookie.indexOf('token') != -1){
          console.log("not logged in");
          //todo add login popup?
          return;
        }
        fetch(`/api/addcomment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
            articleId: id,
          }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data) => {
            console.log(data);
          });
      }}>Add Comment</button>
    </>
  );
}
