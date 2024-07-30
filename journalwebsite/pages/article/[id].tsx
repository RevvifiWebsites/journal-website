import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import SideBar from "../sidebar";

export default function Home() {
  const [pdffile, setPdfFile] = useState({} as any);

  const [article, setArticle] = useState({
    title: "Loading...",
    content: "",
    credit: "",
    file: null as {
      url: string;
    } | null,
    published: true,
  });
  const router = useRouter();
  const [comments, setComments] = useState([
    {
      authorName: "Loading...",
      content: "Loading...",
      id: "Loading...",
      downvotes: [""],
      upvotes: [""],
      
    },
  ]);
  const [comment, setComment] = useState("");
  const { id } = router.query;
  useEffect(() => {
    if (id == undefined) {
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
      });
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
        if (data.file) {
          console.log(data.file.downloadUrl);
          fetch(data.file.downloadUrl, {})
            .then((res) => {
              if (res.ok) {
                return res.text();
              }
            })
            .then((data) => {
              console.log(data);
              setPdfFile(data);
            });
        }
      });
  }, [id]);
  return (
    <>
    <SideBar></SideBar>
      {!article.published && <div>
        This article is not yet published. It will not be discoverable to others untill it has been approved </div>}
      {article.title}
      <h2>By {article.credit}</h2>
      <Markdown>{article.content}</Markdown>
      {article.file && pdffile && <embed src = {"data:application/pdf;base64," + pdffile} type="application/pdf"  ></embed>}
      <br></br>
      <hr></hr>
      {comments.map((comment) => {
        console.log(comment);
        return (
          <div>
            <h3>{comment.authorName}</h3>
            <p>{comment.content}</p>
            <p>{comment.upvotes.length - comment.downvotes.length}</p>
            <button
              onClick={() => {
                fetch(`/api/votecomment`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: comment.id,
                    vote: 1,
                  }),
                })
                  .then((res) => {
                    if (!res.ok) {
                      return res.json();
                    } else {
                      let newcomments = comments.map((c) => {
                        if (c.id == comment.id) {
                          c.upvotes.push("1");
                        }
                        return c;
                      });
                      setComments(newcomments);
                    }
                  })
                  .then((data) => {
                    console.log(data);
                  });
              }}
            >
              Upvote
            </button>
            <button
              onClick={() => {
                fetch(`/api/votecomment`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: comment.id,
                    vote: -1,
                  }),
                })
                  .then((res) => {
                    if (!res.ok) {
                      return res.json();
                    } else {
                      let newcomments = comments.map((c) => {
                        if (c.id == comment.id) {
                          c.downvotes.push("1");
                        }
                        return c;
                      });
                      setComments(newcomments);
                    }
                  })
                  .then((data) => {
                    console.log(data);
                  });
              }}
            >
              Downvote
            </button>
          </div>
        );
      })}
      <textarea
        placeholder="add comment"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></textarea>
      <button
        onClick={() => {
          if (document.cookie.indexOf("token") != -1) {
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
              setComments([
                ...comments,
                {
                  authorName: data.authorName,
                  content: comment,
                  upvotes: [],
                  downvotes: [],
                  id: data.id,
                },
              ]);
            });
        }}
      >
        Add Comment
      </button>
    </>
  );
}
