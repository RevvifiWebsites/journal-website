import styles from "@/styles/Sidebar.module.css";
import Image from "next/image";
export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.navcontainers}>
        <a href = "/">
        <Image src="/images/ym.svg" alt="logo" width={0} height={0} className={styles.navimage}></Image>
        </a>
        <a href = "/browse">
        <Image src="/images/book.svg" alt="browse articles image" width={0} height={0} className={styles.navimage}></Image>
        </a>
        <a href = "/logged/writearticle">
         <div className={styles.navimagewrap} >
            <Image src="/images/plus.svg" alt="add article image" width={0} height={0} className={styles.smallnavimage}></Image>
         </div>
        </a>
      </div>
      <div className={styles.navcontainers}>
        <a href = "/logged/account">
         <Image width={0} height={0} className = {styles.navimage} alt = "account" src = "/images/account.svg"></Image>
         </a>
         <a href="/logout">
             <Image width={0} height={0} className = {styles.navimage} alt = "logout" src = "/images/logout.svg"></Image>
         </a>
      </div>
    </div>
  );
}
