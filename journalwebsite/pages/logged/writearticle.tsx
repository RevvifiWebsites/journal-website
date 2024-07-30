
import Image from "next/image";
import styles from "@/styles/Write.module.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import SideBar from "../sidebar";

export default function Home() {
  //TODO maybe save this to local storage so that it isn't lost? maybe allow draft saving?
  const [article, setArticle] = useState({
    title: "Enter Title",
    content: "" as string | null,
    authors: "",
  });
  const [filesubmit, setFileSubmit] = useState(true);
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
  }, [file, filesubmit]);
  return (
    <div className={styles.page}>
      <SideBar/>
      <div className={styles.centerpage}>
        <h1>Submit Your Research Here</h1>
        <div>
          <h2 className={styles.inputtitle}> Work Title</h2>
          <textarea
            id="title"
            placeholder="e.g The Effects of Climate Change on the Economy"
            onChange={(e) => {
              setArticle({ ...article, title: e.target.value });
            }}
            className={styles.textinput}
          ></textarea>
        </div>
        <div>
          <h2 className={styles.inputtitle}>Work Authors</h2>
          <textarea
            id="Authors"
            placeholder="e.g John Doe, Jane Doe"
            onChange={(e) => {
              setArticle({ ...article, authors: e.target.value });
            }}
            className={styles.textinput}
          ></textarea>
        </div>
        <h2 className={styles.leftinputtitle}>Submit Article</h2>
        <div>
          <div className={styles.rightcontents}>
            <button
              className={styles.multiselect}
              onClick={() => {
                setArticle({ ...article, content: "" });
                setFileSubmit(!filesubmit);
              }}
            >
              <div
                className={
                  filesubmit ? styles.activemulti : styles.inactivemulti
                }
              >
                File
              </div>
              <div
                className={
                  !filesubmit ? styles.activemulti : styles.inactivemulti
                }
              >
                Text
              </div>
            </button>
          </div>
          {filesubmit ? (
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
          ) : (
            <div>
              <textarea
                id="content"
                className={styles.content}
                placeholder="Articles support markdown formatting"
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    setArticle({ ...article, content: article.content + "\n" });
                    (e.target as HTMLTextAreaElement).value =
                      article.content + "\n";
                  }
                }}
                onChange={(e) => {
                  setArticle({ ...article, content: e.target.value });
                }}
              ></textarea>
            </div>
          )}
        </div>
        <h1 className={styles.leftinputtitle}>Preview</h1>
        {filesubmit ? (
          file && (

            <div id = "parentdiv" ><embed
              type="application/pdf"
              src={URL.createObjectURL(file).toString() + "#toolbar=0"}
              className={styles.iframes}
              id="embed"
            ></embed></div>
          )
        ) : (
          <Markdown className={styles.markdown}>{article.content}</Markdown>
        )}
        <button
          className={styles.submitbutton}
          onClick={async (e) => {
            if (
              article.title == "Enter Title" ||
              (article.content == "" && !filesubmit)
            ) {
              return;
            }
            if (filesubmit && !file) {
              return;
            }
            if (filesubmit) {
              setArticle({ ...article, content: null });
            }
            console.log(file);
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
