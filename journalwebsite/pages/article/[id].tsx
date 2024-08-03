
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import SideBar from "../sidebar";
import style from "../../styles/Read.module.css";
import PDFViewer from "../pdfviewer";

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
        }
        else if(res.status == 401){
          //todo loging popup?
          window.location.href = "/login";
        }
        else if(res.status == 400){
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        let newcomments = comments.map((x) => {
          if (x.id == commentid) {
            return { ...x, upvotes: data.upvotes, downvotes: data.downvotes };
          }
          return x;
        });
      setComments(newcomments);
      });
      let selfid = document.cookie.split(";").find((x) => x.includes("id="))?.split("=")[1];
      console.log(selfid)
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
    },
  ]);
  const [comment, setComment] = useState("");
  const { id } = router.query;
  useEffect(() => {
    setId(document.cookie.split(";").find((x) => x.includes("id="))?.split("=")[1] || "");
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
    <div className= {style.page}>
    <SideBar></SideBar>
      {!article.published && <div className= {style.publishedpopup}>
        This article is not yet published. It will not be discoverable to others untill it has been approved </div>}
      <h1 className={style.title}>{article.title}</h1>
      <h2 className={style.credits}>By:  {article.credit} |  {" " + new Date(article.createdAt).toLocaleString() }</h2>
      <hr></hr>
      {  (<PDFViewer style = {{
}}file={pdffile} nostacked width= "60%" ></PDFViewer>)}
      <br></br>
      <hr></hr>
      {comments.map((comment) => {
        console.log(comment);
        return (
          <div>
            <h3 className= {style.commentauth}>{comment.authorName}</h3>
            <p className= {style.commenttext}>{comment.content}</p>
            <p>{comment.upvotes.length - comment.downvotes.length}</p>
            <button className= {comment.upvotes.includes(myid) ? style.clickedbutton : style.unclickedbutton} onClick={() => {
              vote(comment.id, 1);
            } }>upvote</button>
            <button className= {comment.downvotes.includes(myid) ? style.clickedbutton : style.unclickedbutton} onClick={() => {
              vote(comment.id, -1);
            } }>downvote</button>
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
    </div>
  );
}
