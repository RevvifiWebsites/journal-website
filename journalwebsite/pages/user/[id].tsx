import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideBar from "../sidebar";
import styles from "../../styles/User.module.css";
import Image from "next/image";
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
}
export interface Fact {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  articleId?: string;
  published: boolean;
}
export default function User() {
  const id = useRouter().query.id;
  const [user, setUser] = useState({} as User);
  useEffect(() => {
    if (id) {
      fetch(`/api/getuser?id=${id}`)
        .then((res) => res.json())
        .then((user) => {
          console.log(user);
          setUser(user);
        });
    }
  }, [id]);
  return (
    <div className={styles.page}>
      <SideBar />
      <h1>{user.username}</h1>
      <p>
        Joined {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
      </p>
      <div className={styles.statchips}>
        <div className={styles.statchip}>
          <div className={styles.textchip}>
            <h2>{user.posts?.length}</h2>
            <p>{`Article${ user?.posts?.length != 1 ? 's' : ""}`}</p>
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
            <p>{`Fact${ user?.facts?.length != 1 ? 's' : ""}`}</p>
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
            <p>{`Comment${ user?.comments?.length != 1 ? 's' : ""}`}</p>
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
        <div className={styles.artcles}></div>
        <div className={styles.funfacts}></div>
      </div>
    </div>
  );
}
