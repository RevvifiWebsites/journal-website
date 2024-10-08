import Head from "next/head";
import Image from "next/image";
// import SideBar from "./sidebar";
import Navigation from "./sidebar";
import FeaturedWork from "./FeaturedWork";
import OtherWorks from "./OtherWorks";
import FunFacts from "./FunFacts";
import styles from "../styles/Index.module.css"
import { useEffect, useState } from "react";

export default function Home(props : {rus : boolean}) {
  console.log(props.rus);
  const [articles, setArticles] = useState([] as {
    id: string;
    title: string;
    credit: string;
    createdAt: string;
  }[]);
  const [featuredArticles, setFeaturedArticles] = useState([] as {
    id: string;
    title: string;
    credit: string;
    createdAt: string;
  }[]);

  useEffect(() => {
    fetch("/api/getfeature", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: 0,
        take: 3,
      }),
    }).then((res) => res.json()).then((data) => {
      setFeaturedArticles(data);
    });
    fetch("/api/getarticlelist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: 0,
        take: 5,
        search: ''
      }),
    }).then((res) => res.json()).then((data) => {
      setArticles(data);
    });
    }
  , []);
  return (
    <div className={styles.container}>
      {/* <img src="/images/BG.png" className="background-image" draggable="false"/> */}
      {/* <div className={styles.sidebar}></div> */}
      <Navigation rus = {props.rus}/>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
        <h1 className="heading-1">{props.rus ? "Центр молодых " : "Modern Hub for" }<br/> {props.rus ? "исследователей" : "Young Researchers" }</h1>
        <p className="body-regular">{props.rus ? `Здесь старшеклассники и студенты могут поделиться своими
научно-исследовательскими работами на английском или русском
языке. Они также могут обмениваться своими идеями и мнениями.` : "Here high-school and college students can share their scientific research in English or Russian. They can also exchange ideas and opinions"}</p>
        <div className={styles.buttonContainer}>
          <button className="button-primary"><a href="/login">{props.rus ? "Зарегистрироваться" : "Sign Up"}</a></button>
          <button className="button-secondary" onClick={ () => {
            window.scrollTo({top: document.getElementById("featured")?.getBoundingClientRect().top, behavior: 'smooth'});
          }}>{props.rus ? "Смотреть работы" : "View Featured"} 🠇</button>
        </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.spacer}></div>

          <div className={`${styles.heroCard} ${styles.item1}`}>
            <div className={styles.flex}>
              <img src="/icons/pencil.svg" />
              <p className="body-bold">{props.rus ? "Публичные работы" : "Public Research"}</p>
            </div>
            <p className="body-small">{props.rus ? "Делитесь собственными  исследовательскими работами с другими. Сначала  ваша работа будет отправлена на проверку.": " Share your own research with others. Your research will first be check by our moderators."}</p>
          </div>

          <div className={`${styles.heroCard} ${styles.item2}`}>
          <div className={styles.flex}>
              <img src="/icons/eye.svg" />
              <p className="body-bold">{props.rus ? "исследовательскими" :"View Researches"}</p>
            </div>
            <p className="body-small">{props.rus ? "Наша библиотке пока еще мала, на надеемся, что со временем она будет cta новиться только больше!" : "Explore our huge library, with thousands of researches on various topics, by brilliant minds."}</p>
          </div>

          <div className={`${styles.heroCard} ${styles.item3}`}>
          <div className={styles.flex}>
              <img src="/icons/bulb.svg" />
              <p className="body-bold">Fun Fact Scattered</p>
            </div>
            <p className="body-small">{ props.rus ? "йте интересные факты разбросанные по всему сайту, и добавляйте собственные!" : "You can find fun facts scattered around the website, so your mind stays refreshed."}</p>
          </div>

          <div className={`${styles.heroCard} ${styles.item4}`}>
          <div className={styles.flex}>
              <img src="/icons/people.svg" />
              <p className="body-bold">{props.rus ? "Дружеское сообщество" : "Vibrant Community"}</p>
            </div>
            <p className="body-small">{props.rus ? "Общайтесь с такими же увлеченными людьми": "Engage with other brilliant minds. Remember to always stay respectful in comments."}</p>
          </div>
        </div>
      </div>
      <div className={styles.uniList}>
      </div>
      <section className={styles.fw} id = "featured">
        <img className={styles.backgroundImage} src="/images/BG2.png" />
        <h2 className="heading-2">Featured Work</h2>
        <div className={styles.featuredWorkContainer}>
          {
            featuredArticles.map((article) => {
              return <FeaturedWork key={article.id} id={article.id} title={article.title} credit= {article.credit} createdAt = {article.createdAt }/>
            })
          }
        </div>
      </section>

      <div className={styles.factsAndOthers}>
        <div className={styles.otherWorksContainer}>
          <div className={styles.otherWorksHeading}>
            <h2 className="heading-2">Other Works</h2>
            <a href = "/browse">View all</a>
          </div>
            {
              articles.map((article) => {
                return <OtherWorks key={article.id} id={article.id} title={article.title} credit= {article.credit} createdAt = {article.createdAt }/>
              })
            }
        </div>
        <FunFacts rus = {props.rus}/>
      </div>
      <footer>
        <img className={styles.footerCurve} src="/images/footerCurve.png" />
        <div className={styles.footerContent}>
          <h2 className="heading-2">Today could be the best day of your (research) life</h2>
          <a href="/login"> <button className="button-primary">Sign Up</button></a>
        </div>
        <div className={styles.footerBottom}>
          <p className="body-secondary">Copyright © 2024 YoundMinds, All Rights Reserved</p>
        </div>

      </footer>

      {/* <h1> this still needs to be styled yeah</h1>
        <a href = "/login">login</a>
        <a href = "/register">register</a>
        <a href = "/logged/addarticle">add article</a> */}
    </div>
  );
}
