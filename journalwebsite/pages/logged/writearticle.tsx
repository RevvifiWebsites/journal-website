
import Image from "next/image";
import styles from "@/styles/Write.module.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Navigation from "../sidebar";

export default function Home() {
  //TODO maybe save this to local storage so that it isn't lost? maybe allow draft saving?
  const [article, setArticle] = useState({
    title: "Enter Title",
    authors: "",
  });
  const [file, setFile] = useState(null as File | null);

  useEffect(() => {
    if(navigator.userAgent.indexOf("Firefox") != -1){
      let parent = document.getElementById("parentdiv");
      let embed = document.getElementById("embed");
      if(parent && embed){
        parent.style.overflow = "hidden";
        embed.style.transform = "translateY(-4%)";
      }
    }
  }, [file]);
  return (
    <div className={styles.page}>
      <Navigation/>
      <img src="/images/BG.png" className="background-image" draggable="false"/>
      
      <h1 className="heading-2">Submit Your Research Here</h1>
      <div className={styles.pageContent}>
      
        {/* Research Title Input */}
        <div>
          <h2 className="body-bold"> Work Title</h2>
          <input
            id="title"
            placeholder="e.g The Effects of Climate Change on the Economy"
            onChange={(e) => {
              setArticle({ ...article, title: e.target.value });
            }}
            className={styles.textinput}
          ></input>
        </div>

        {/* Authors Input */}
        <div>
          <h2 className="body-bold">Work Authors</h2>
          <input
            id="Authors"
            placeholder="e.g John Doe, Anna Mark"
            onChange={(e) => {
              setArticle({ ...article, authors: e.target.value });
            }}
            className={styles.textinput}
          ></input>
        </div>
        
        <h2 className="body-bold">Submit Article</h2>
        <div>
          {/* Selection for File or Text */}
          <div className={styles.rightcontents}>
            
          </div>
            <label htmlFor="file" className={styles.fileinputcont}>
              {!file && (
                <Image
                  src="/fileplus.svg"
                  width={0}
                  height={0}
                  className={styles.uploadicon}
                  alt="file upload"
                />
              )}
              <div className={styles.filelabel}>
                {file
                  ? file.name
                  : "Drag and drop a file here or click the button below"}
              </div>
              <input
                type="file"
                id="file"
                className={styles.fileinput}
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }
                }}
                accept=".pdf"
              />
              {file ? (
                <button
                  className={styles.filebutton}
                  onClick={(e) => {
                    setFile(null);
                  }}
                >
                  Clear File
                </button>
              ) : (
                <div className={styles.filebutton}>Select File</div>
              )}
            </label>
          
        </div>
        <h1 className={styles.leftinputtitle}>Preview</h1>
        {  (
          file && (

            <div id = "parentdiv" ><embed
              type="application/pdf"
              src={URL.createObjectURL(file).toString() + "#toolbar=0"}
              className={styles.iframes}
              id="embed"
            ></embed></div>
          )
        ) }
        <button
          className={styles.submitbutton}
          onClick={async (e) => {
            if (
              article.title == "Enter Title" || !file) {
                return;
              }
            let base64file = null;
            if (file) {
              base64file = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                  resolve(
                    (reader.result as string).replace(/^data:.+;base64,/, "")
                  );
                };
                reader.readAsDataURL(file);
              });
            }
            const res = await fetch("/api/addarticle", {
              method: "POST",
              body: JSON.stringify({
                ...article,
                ...{
                  file: file ? base64file : null,
                  filename: file ? file.name : null,
                  filetype: file ? file.type : null,
                },
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }).then((res) => res.json());
            window.location.href = "/article/" + res.id;
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
