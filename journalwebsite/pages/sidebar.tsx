
import styles from "@/styles/Sidebar.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Sidebar = (props : {admin: boolean}) => {
  const condensedLogo = <p className={styles.logoText}><span className="accent-color">y</span>m</p>
  const expandedLogo = <p className={styles.logoText}><span className="accent-color">young</span>minds.</p>

  const [isHovering, setIsHovering] = useState(false);
  const [isclient , setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
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
        <a href = "/logged/submitfunfact" className={styles.navLink}>
          <Image src="/images/Lightbulb.svg" alt="add article image" width={0} height={0} className={styles.navimage}></Image>
          <p className="body-bold">Add Fun Facts</p>
        </a>
      </div>
      {/* Bottom Nav */}

      <div className={styles.navcontainers}>
      {props.admin && <a href = "/logged/admin" className={styles.navLink}>
          <Image width={0} height={0} className = {styles.navimage} alt = "admin" src = "/images/admin.svg"></Image>
          <p className="body-bold">Admin Dashboard</p>
        </a>}
        <a onClick = {() => {
      if (document.cookie.indexOf("username") == -1)  window.location.href = "/login"
        window.location.href = `/user/${document.cookie.split(";").filter((e) => {
          return e.includes("id");
        })[0].split('=')[1]}`} } className={styles.navLink}>
          <Image width={0} height={0} className = {styles.navimage} alt = "account" src = "/images/account.svg"></Image>
          <p className="body-bold">Account</p>
        </a>
        <a href={isclient && document.cookie.indexOf("username") == -1 ?  "/login" : "/logout"} className={styles.navLink}>
              <Image width={0} height={0} className = {styles.navimage} alt = "logout" src = "/images/logout.svg"></Image>
              <p className="body-bold">{ isclient && document.cookie.indexOf("username") == -1 ?  "Login" : "Logout"}</p>
          </a>
      </div>
    </div>
  )
}

const Topbar = (props : {admin : boolean}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  }
  const [isclient , setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
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
        <a  onClick = {() => {
      if (document.cookie.indexOf("username") == -1)  window.location.href = "/login"
        window.location.href = `/user/${document.cookie.split(";").filter((e) => {
          return e.includes("id");
        })[0].split('=')[1]}`} }className={styles.navLink}>
          <Image width={0} height={0} className = {styles.navimage} alt = "account" src = "/images/account.svg"></Image>
          <p className="body-bold">Account</p>
        </a>
        {props.admin && <a href = "/logged/admin" className={styles.navLink}>
          <Image width={0} height={0} className = {styles.navimage} alt = "admin" src = "/images/admin.svg"></Image>
          <p className="body-bold">Admin Dashboard</p>
        </a>}
        <a href = "/logged/submitfunfact" className={styles.navLink}>
          <Image width={0} height={0} className = {styles.navimage} alt = "account" src = "/images/Lightbulb.svg"></Image>
          <p className="body-bold">Add Fun Facts</p>
        </a>
        <a href={isclient && document.cookie.indexOf("username") == -1 ?  "/login" : "/logout"} className={styles.navLink}>
              <Image width={0} height={0} className = {styles.navimage} alt = "logout" src = "/images/logout.svg"></Image>
              <p className="body-bold">{ isclient && document.cookie.indexOf("username") == -1 ?  "Login" : "Logout"}</p>
          </a>
      </div>
    </div>
  )
}

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [admin , setAdmin] = useState(false);
  useEffect(() => {
    fetch("/api/getuser", {
      method: "POST",
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
        setAdmin(data?.admin);
      });
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkScreenSize(); // Check on initial render
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isMobile ? <Topbar admin = {admin} /> : <Sidebar admin = {admin} />}
    </>
  );
};

export default Navigation;
