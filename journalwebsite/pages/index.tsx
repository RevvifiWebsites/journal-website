import Head from "next/head";
import Image from "next/image";
import FeaturedWork from "./FeaturedWork";
import OtherWorks from "./OtherWorks";
import FunFacts from "./FunFacts";
import styles from "../styles/Index.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <img src="/images/BG.png" className="background-image" draggable="false"/> */}
      <div className={styles.sidebar}></div>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
        <h1 className="heading-1">Modern Hub for <br/> Young Researchers</h1>
        <p className="body-regular">Here high-school and college students can share their scientific research in English or Russian. They can also exchange ideas and opinions</p>
        <div className={styles.buttonContainer}>
          <button className="button-primary">Sign Up</button>
          <button className="button-secondary">View Featured 🠇</button>
        </div>
        
        </div>

        <div className={styles.heroRight}>
          <div className={styles.spacer}></div>

          <div className={`${styles.heroCard} ${styles.item1}`}>
            <div className={styles.flex}>
              <img src="/icons/pencil.svg" />
              <p className="body-bold">Public Research</p>
            </div>
            <p className="body-small">Share your own research with others. Your research will first be check by our moderators.</p>
          </div>

          <div className={`${styles.heroCard} ${styles.item2}`}>
          <div className={styles.flex}>
              <img src="/icons/eye.svg" />
              <p className="body-bold">View Researches</p>
            </div>
            <p className="body-small">Explore our huge library, with thousands of researches on various topics, by brilliant minds.</p>
          </div>

          <div className={`${styles.heroCard} ${styles.item3}`}>
          <div className={styles.flex}>
              <img src="/icons/bulb.svg" />
              <p className="body-bold">Fun Fact Scattered</p>
            </div>
            <p className="body-small">You can find fun facts scattered around the website, so your mind stays refreshed.</p>
          </div>

          <div className={`${styles.heroCard} ${styles.item4}`}>
          <div className={styles.flex}>
              <img src="/icons/people.svg" />
              <p className="body-bold">Vibrant Community</p>
            </div>
            <p className="body-small">Engage with other brilliant minds. Remember to always stay respectful in comments.</p>
          </div>
        </div>
      </div>
      
      <div className={styles.uniList}>
        <img src="/icons/penn.svg" draggable="false"/>
        <img src="/icons/duke.svg" draggable="false"/>
        <img src="/icons/nyu.svg" draggable="false"/>
        <img src="/icons/oxford.svg" draggable="false"/>
        <img src="/icons/stanford.svg" draggable="false"/>
        <img src="/icons/lseps.svg" draggable="false"/>
      </div>

      <section className={styles.fw}>
        <img className={styles.backgroundImage} src="/images/BG2.png" />
        <h2 className="heading-2">Featured Work</h2>
        <div className={styles.featuredWorkContainer}>
          <FeaturedWork
            image="/images/fw-1.png"
            title="Mechanistic Deconvolution of Autoreduction in Tetrazolium-Based CellViability Assays"
            authorName="Tran et al."
            publishDate="July 15th, 2024"
            views="222"
            tags={['Redox Reactions', 'Mass Spectroscopy', 'Formazan']}
          />
          <FeaturedWork
            image="/images/fw-2.png"
            title="Using Gravitational Waves to Determine if Primordial Black Holes are Sources of Dark Matter"
            authorName="Tran et al."
            publishDate="July 15th, 2024"
            views="222"
            tags={['Redox Reactions', 'Mass Spectroscopy', 'Formazan']}
          />
          <FeaturedWork
            image="/images/fw-3.png"
            title="Optical anisotropy of crystallized vanillin thin film: the science behind the art"
            authorName="Tran et al."
            publishDate="July 15th, 2024"
            views="222"
            tags={['Redox Reactions', 'Mass Spectroscopy', 'Formazan']}
          />
        </div>
      </section>

      <div className={styles.factsAndOthers}>
        <div className={styles.otherWorksContainer}>
          <div className={styles.otherWorksHeading}>
            <h2 className="heading-2">Other Works</h2>
            <p>View all</p>
          </div>
          <OtherWorks
            image="/images/fw-1.png"
            title="Optical anisotropy of crystallized vanillin thin film: the science behind the art"
            authorName="Tran et al."
            publishDate="July 15th, 2024"
            views="222"
            tags={['Redox Reactions', 'Mass Spectroscopy', 'Formazan']}
          />
          <OtherWorks
            image="/images/fw-2.png"
            title="Confrontation  of Powers in the Norman Kingdom of Sicily: Kings, Nobles, Bureaucrats  and Cities, Citta e vita cittadina nei Paesi dell'area mediterranea:  secoli XI-XV, Atti del Convegno Internazionale in onore di Salvatore  Tramontana, a cura di B. Saitta (Roma, Viella, 2006), pp. 541-552."
            authorName="Tran et al."
            publishDate="July 15th, 2024"
            views="222"
            tags={['Redox Reactions', 'Mass Spectroscopy', 'Formazan']}
          />
          <OtherWorks
            image="/images/fw-3.png"
            title="Optical anisotropy of crystallized vanillin thin film: the science behind the art"
            authorName="Tran et al."
            publishDate="July 15th, 2024"
            views="222"
            tags={['Redox Reactions', 'Mass Spectroscopy', 'Formazan']}
          />
          <OtherWorks
            image="/images/fw-1.png"
            title="Optical anisotropy of crystallized vanillin thin film: the science behind the art"
            authorName="Tran et al."
            publishDate="July 15th, 2024"
            views="222"
            tags={['Redox Reactions', 'Mass Spectroscopy', 'Formazan']}
          />
        </div>
        <FunFacts/>
      </div>
      
      <footer>
        <img className={styles.footerCurve} src="/images/footerCurve.png" />
        <div className={styles.footerContent}>
          <h2 className="heading-2">Today could be the best day of<br/> your (research) life</h2>
          <button className="button-primary">Sign Up</button>
        </div>
        
        <div className={styles.footerBottom}>
          <p className="body-secondary">Copyright © 2024 YoundMinds, All Rights Reserved</p>
          <p className="body-secondary">Terms & Conditions<span>Privacy Policy</span></p>
        </div>

      </footer>

      {/* <h1> this still needs to be styled yeah</h1>
        <a href = "/login">login</a>
        <a href = "/register">register</a>
        <a href = "/logged/addarticle">add article</a> */}
    </div>
  );
}
