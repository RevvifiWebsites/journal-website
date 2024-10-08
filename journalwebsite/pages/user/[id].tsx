import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideBar from "../sidebar";
import styles from "../../styles/User.module.css";
import Image from "next/image";
import PDFViewer from "../pdfviewer";
import FunFacts from "../FunFacts";
import Navigation from "../sidebar";
export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  admin: boolean;
  country: any;
  posts: Post[];
  facts: Fact[];
  comments: any[];
  username: string;
}
export interface Post {
  id: string;
  title: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  credit: string;
  type: string;
  featured: boolean;
  file: string;
}
export interface Fact {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  articleId?: string;
  published: boolean;
}
export default function User(props : any) {
  const id = useRouter().query.id;
  const [user, setUser] = useState({} as User);
  useEffect(() => {
    if (id) {
      fetch(`/api/getuser?id=${id}`)
        .then((res) => {
          if(res.status == 404) {
            window.location.href = "/404";
          }
          return res.json()
        })
        .then(async (user) => {
          let promises = [];
          for(let i = 0; i < user.posts.length; i++) {
             promises.push((fetch(`/api/getpdf?id=${user.posts[i].id}`)
              .then((res) => res.json()).then(async (data) => {
                user.posts[i].file = await (await fetch(data.url)).text();
              })));
          }
          await Promise.all(promises);
          setUser(user);
        });
    }
  }, [id]);
  return (
    <div className={styles.page}>
      <Navigation rus = {props.rus} />
      <h1>{user.username}</h1>
      <p>
        {props.rus ? "Присоединился": "Joined"} {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
      </p>
      <div className={styles.statchips}>
        <div className={styles.statchip}>
          <div className={styles.textchip}>
            <h2>{user.posts?.length}</h2>
            <p>{`${props.rus ? "Работы" : "Article" + (  user?.posts?.length != 1 ? 's' : "")}`}</p>
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
            <h2>{user?.facts?.length} </h2>
            <p>{`${props.rus ? "Факты" : "Fact" + (user?.facts?.length != 1 ? 's' : "" )}`}</p>
          </div>
          <Image
            src="/images/unpublishedchip.svg"
            alt="graph bars with glass"
            width={200}
            height={200}
            className={styles.statimage}
          ></Image>
        </div>{" "}
        <div className={styles.statchip}>
          <div className={styles.textchip}>
            <h2>{user?.comments?.length} </h2>
            <p>{`${props.rus ? "Комментарии" : ("Comment" +  (user?.comments?.length != 1 ? 's' : ""))}`}</p>
          </div>
          <Image
            src="/images/comment.svg"
            alt="comment box"
            width={200}
            height={200}
            className={styles.statimage}
          ></Image>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.artcles}>
          {user?.posts?.length > 0 ? user?.posts?.map((post) => {
            return (
              <div key={post.id} className={styles.article} onClick ={ () => {
                window.location.href = `/article/${post.id}`
              }}>
                <div className = {styles.articletext}>
                <h2>{post.title.substring(0, 200) + (post.title.length > 200 ? "..." : "")}</h2>
                <p>{post.credit}</p>
                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                {/* I so painfully regret not putting the code for loading a file in the pdf viewer, but Im too deep in with the shitty code now... */}
                <PDFViewer
                      file={post.file}
                      contstile={styles.pdf}
                      overflow="hidden"
                      nostacked
                      canvasstyle={styles.canvaspdf}
                      />
              </div>
            );
          }) : <h2>{props.rus ? "Нет опубликованных работ" : "No published articles"}</h2>}
        </div>
        <div className={styles.funfacts}>
          <FunFacts facts={user.facts || [] } rus = {props.rus}/>
        </div>
      </div>
    </div>
  );
}
