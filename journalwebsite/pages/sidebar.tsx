import styles from "@/styles/Sidebar.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const condensedLogo = <p className={styles.logoText}><span className="accent-color">y</span>m</p>
  const expandedLogo = <p className={styles.logoText}><span className="accent-color">young</span>minds.</p>

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
        className={styles.sidebar}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
    >
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
  )
}

const Topbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={`${styles.topNav} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <div className={styles.menuBar}>
        <a href="/" className={styles.logoText}><span className="accent-color">young</span>minds.</a>
        <Image width={0} height={0} className={styles.navimage} alt = "menu" src={`/icons/${isExpanded ? 'arrow_back.svg' : 'menu.svg'}`} onClick={toggleNav}></Image>
      </div>

      <div className={styles.topLinks}>
        <a href = "/browse" className={styles.navLink}>
          <Image src="/images/book.svg" alt="browse articles image" width={0} height={0} className={styles.navimage}></Image>
          <p className="body-bold">View Researches</p>
        </a>
        <a href = "/logged/writearticle" className={styles.navLink}>
          <Image src="/images/plus.svg" alt="add article image" width={0} height={0} className={styles.navimage}></Image>
          <p className="body-bold">Add Research</p>
        </a>
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
  )
}

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkScreenSize(); // Check on initial render
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isMobile ? <Topbar /> : <Sidebar />}
    </>
  );
};

export default Navigation;
