import styles from "@/styles/Sidebar.module.css";
import Image from "next/image";
import { useState } from "react";

export default function SideBar() {

  const condensedLogo = <p className={styles.logoText}><span className="accent-color">y</span>m</p>
  const expandedLogo = <p className={styles.logoText}><span className="accent-color">young</span>minds.</p>

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={styles.sidebar} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      {/* Top Nav */}
      <div className={styles.navcontainers}>
        <a href = "/">
          <div>
            {isHovering ? expandedLogo : condensedLogo}
          </div>
        </a>

        <a href = "/browse" className={styles.navLink}>
          <Image src="/images/book.svg" alt="browse articles image" width={0} height={0} className={styles.navimage}></Image>
          <p className="body-bold">View Researches</p>
        </a>

        <a href = "/logged/writearticle" className={styles.navLink}>
          <Image src="/images/plus.svg" alt="add article image" width={0} height={0} className={styles.navimage}></Image>
          <p className="body-bold">Add Research</p>
        </a>
      </div>

      {/* Bottom Nav */}
      <div className={styles.navcontainers}>
        <a href = "/logged/account" className={styles.navLink}>
         <Image width={0} height={0} className = {styles.navimage} alt = "account" src = "/images/account.svg"></Image>
         <p className="body-bold">Account</p>
        </a>
         <a href="/logout" className={styles.navLink}>
             <Image width={0} height={0} className = {styles.navimage} alt = "logout" src = "/images/logout.svg"></Image>
             <p className="body-bold">Logout</p>
         </a>
      </div>
    </div>
  );
}
