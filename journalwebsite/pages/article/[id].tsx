import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import SideBar from "../sidebar";
import style from "../../styles/Read.module.css";
import PDFViewer from "../pdfviewer";

import Image from "next/image";
function timeSince(date: Date) {
  var seconds = Math.floor((Number(new Date()) - Number(date)) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
export default function Home() {
  async function vote(commentid: string, vote: number) {
    fetch(`/api/votecomment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: commentid,
        vote: vote,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status == 401) {
          //todo loging popup?
          window.location.href = "/login";
        } else if (res.status == 400) {
          return res.json();
        }
      })
      .then((data) => {
        let newcomments = comments.map((x) => {
          if (x.id == commentid) {
            return { ...x, upvotes: data.upvotes, downvotes: data.downvotes };
          }
          return x;
        });
        setComments(newcomments);
      });
    let selfid = document.cookie
      .split(";")
      .find((x) => x.includes("id="))
      ?.split("=")[1];
    console.log(selfid);
  }
  const [pdffile, setPdfFile] = useState({} as any);
  const [myid, setId] = useState("");
  const [article, setArticle] = useState({
    title: "Loading...",
    content: "",
    credit: "",
    file: null as {
      url: string;
    } | null,
    published: true,
    createdAt: "Loading...",
  });
  const router = useRouter();
  const [comments, setComments] = useState([
    {
      authorName: "Loading...",
      content: "Loading...",
      id: "Loading...",
      downvotes: [""],
      upvotes: [""],
      createdAt: "",
    },
  ]);
  const [opencomment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = router.query;
  useEffect(() => {
    setId(
      document.cookie
        .split(";")
        .find((x) => x.includes("id="))
        ?.split("=")[1] || ""
    );
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

              setPdfFile(data);
            });
        }
      });
  }, [id]);
  return (
    <div className={style.page}>
      <SideBar></SideBar>
      {!article.published && (
        <div className={style.publishedpopup}>
          This article is not yet published. It will not be discoverable to
          others untill it has been approved{" "}
        </div>
      )}
      <h1 className={style.title}>{article.title}</h1>
      <h2 className={style.credits}>
        By: {article.credit} |{" "}
        {" " + new Date(article.createdAt).toLocaleString()}
      </h2>
      <hr></hr>
      <div className={style.readercont}>
        {
          <PDFViewer
            style={{}}
            file={pdffile}
            nostacked
            width="60%"
            overflow="visible"
          ></PDFViewer>
        }
        <button className={`${style.commentopenbutton} ${opencomment ? style.hiddencomment : ""} `} onClick={() => {
          setOpenComment(!opencomment);
        }}>
          <Image
            src="/icons/comment.svg"
            width="25"
            height="25"
            alt="comment"
            ></Image>
        </button>
        <div className={` ${style.commentcontainer} ${opencomment ? style.opencomment : style.hiddencomment}` }>
          <div className={style.commentviewbutton} onClick={
            () => {
              setOpenComment(!opencomment);
            }
          }>
            X
            </div>
          <div className={style.commentlist}>
            {comments.map((comment) => {
              return (
                <div className={style.comment}>
                  <p className={style.commentauth}>
                    {comment.authorName} |{" "}
                    {timeSince(new Date(comment.createdAt))} ago{" "}
                  </p>
                  <p className={style.commenttext}>{comment.content}</p>
                  <div className={style.votesection}>
                    <button
                      className={style.votebutton}
                      onClick={() => {
                        vote(comment.id, 1);
                      }}
                    >
                      {comment.upvotes.includes(myid) ? (
                        <Image
                          src="/icons/Thumbsupfill.svg"
                          width="20"
                          height="20"
                          alt="Thumbs up filled"
                        ></Image>
                      ) : (
                        <Image
                          src="/icons/Thumbsup.svg"
                          width="20"
                          height="20"
                          alt="Thumbs up"
                        ></Image>
                      )}
                      {comment.upvotes.length}
                    </button>
                    <button
                      className={style.votebutton}
                      onClick={() => {
                        vote(comment.id, -1);
                      }}
                    >
                      {comment.downvotes.includes(myid) ? (
                        <Image
                          src="/icons/Thumbsdownfill.svg"
                          width="20"
                          height="20"
                          alt="Thumbs down"
                        ></Image>
                      ) : (
                        <Image
                          src="/icons/Thumbsdown.svg"
                          width="20"
                          height="20"
                          alt="Thumbs down"
                        ></Image>
                      )}
                      {comment.downvotes.length}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <hr className= {
            style.commenthr
          }></hr>
          <textarea
          id = "commentbox"
            placeholder="add comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          > </textarea>
          <button className= {style.addcomment}
            onClick={() => {
              if (document.cookie.indexOf("token") != -1) {

                //todo add login popup?
                return;
              }
              setComment("");
              (document.getElementById("commentbox") as HTMLTextAreaElement).value = "";
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
                      createdAt: new Date().toLocaleString(),
                    },
                  ]);
                });
            }}
          >
            <Image src="/icons/send.svg" width="35" height="35" alt = "send"></Image>
          </button>
        </div>
      </div>
    </div>
  );
}
